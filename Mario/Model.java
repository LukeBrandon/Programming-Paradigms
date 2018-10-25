import java.util.ArrayList;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;
import java.awt.Graphics;

class Model{
	ArrayList<Sprite> sprites;	
	int cameraPos;
	Mario mario;	//only instance of mario, instantiated in the unmarshall from JSON file
	int x1, y1, x2, y2;
	static BufferedImage backgroundImage = null;
	int backgroundX;

	final int run = 0; 
	final int runBack = 1;
	final int jump = 2;
	final int runAndJump = 3;


	Model(){
		sprites = new ArrayList<Sprite>();

		//lazy load background image
		if(backgroundImage == null){
			try{
				backgroundImage = ImageIO.read(new File("background.png"));
			}catch(Exception e){}
		}

		this.unmarshal();
		backgroundX = 0;
		cameraPos = 10;
	}//end of model constuctor

	Model(Model that){
		//array list deep copy
		sprites = new ArrayList<Sprite>();
		for(int i = 0; i < that.sprites.size(); i++){
			Sprite other = that.sprites.get(i);
			Sprite clone = other.cloneMe(that);	//should that be this in this?
			sprites.add(clone);
			if(clone.isMario()) mario = (Mario)clone;
		}
		//System.out.println("cloned sprites");
		this.cameraPos = that.cameraPos;
		this.x1 = that.x1;
		this.x2 = that.x2;
		this.y1 = that.y1;
		this.y2 = that.y2;
		this.backgroundX = that.backgroundX;
	}


	//new modle update method
	public void update(){
		cameraPos = mario.xPos -250;
		backgroundX = -cameraPos/3;

		for(int i =0; i < sprites.size(); i++){
			Sprite tempSprite  = sprites.get(i);
			tempSprite.update(sprites);
		}
	}
	
	//making bricks
	void setStart(int x, int y){
		x1 = x;
		y1 = y;
	}
	
	void setEnd(int x, int y){
		x2 = x;
		y2 = y;
		createBrick(x1, y1, x2, y2);
	}
	
	void createBrick(int x1, int y1, int x2, int y2){
		int x = Math.min(x1,x2) + cameraPos;
		int y = Math.min(y1,y2);
		int w = Math.max(x1,x2) - Math.min(x1,x2);
		int h = Math.max(y1,y2) - y;

		Brick b1 = new Brick(x,y,w,h, this);	//this makes the new brick 
		sprites.add(b1);					//adds the new brick to the array list of bricks		
	}

	void undo(){
		//undoes the last brick drawing
		int lastIndex = sprites.size()-1;
		boolean looking = true;

		//looks to delete the last added brick from sprites
		while(lastIndex >= 0 && looking){
			if(sprites.get(lastIndex).isABrick()){
				sprites.remove(lastIndex);
				looking = false;
			}else
				lastIndex--;
		}
		if(lastIndex == 0)
			System.out.println("There is nothing left to be undone");
	}	


	double evaluateAction(int action, int depth){
		int d = 6;  //d is the maximum steps in the future to see
		int k = 1;	//k is the number of steps to go before branching again
		//brances d/k times and sees d moves ahead

		// Evaluate the state
		if(depth >= d){
			//favors coins, xPos, and less jumps
			return ((5000*mario.coins) + (mario.xPos) - (100*mario.numJumps)); 
		}

		// Simulate the action
		Model copy = new Model(this); // uses the copy constructor
		copy.doAction(action);
		copy.update(); // advance simulated time

		//does same action unless its been k times of that action
		if(depth % k != 0)
			return copy.evaluateAction(action, depth+1);
		else{
			//finds best evaluation of action
			double best = copy.evaluateAction(run, depth+1);
			best = Math.max(best,
				copy.evaluateAction(jump, depth+1));
			best = Math.max(best,
				copy.evaluateAction(runAndJump, depth+1));
			best = Math.max(best,
				copy.evaluateAction(runBack, depth+1));
			return best;
		}
	}

	void doAction(int i){
		if(i == /*Action.*/run){
			mario.oldPosition();
			mario.moveMarioRight(); 
			mario.animateMario("right");
			//System.out.println("doing run");

		}else if(i == /*Action.*/jump && mario.lastTouchCounter < 7){
			mario.oldPosition();
			mario.vertVel = -20.0;  	//fast to jumping is quick so AI can see ahead better
			mario.numJumps ++;
			//System.out.println("doing jump");

		}else if(i == runAndJump && mario.lastTouchCounter < 7){
			mario.oldPosition();
			mario.vertVel = -20.0;
			mario.moveMarioRight(); 
			mario.animateMario("right");
			//System.out.println("doing run and jump");
		}else{
			// mario.oldPosition();
			// mario.moveMarioLeft();
			// mario.animateMario("left");
		}
	}


	//-----------------JSON------------------------

	//Marshals this object into a JSON
	Json marshal()
	{
		Json ob = Json.newObject();

		//puts bricks into a tempList
		//and then goes through and adds all of the brick JSON's into the list
		Json tmpList = Json.newList();
		ob.add("sprites", tmpList);

		for(int i = 0; i < sprites.size(); i++){
			tmpList.add(sprites.get(i).marshal());
		}

		ob.save("level1.json");

		//returns JSON object
		return ob; 

	}

	//Unmarshaling
    void unmarshal(){

		//Json ob = Json.load("level1.json");
		Json ob = Json.load("levelDebug.json");

		//create bricks arrayList and temp arrayList
		sprites = new ArrayList<Sprite>();
		Json tmpList = ob.get("sprites");
		
		//intializes all of the json sprites into their respective sprites from the tmplist
		for(int i = 0; i < tmpList.size(); i++){
			String type = tmpList.get(i).getString("type");

			if(type.equals("brick")){
				sprites.add(new Brick(tmpList.get(i))); 

			}else if(type.equals("mario")){
				mario = new Mario(tmpList.get(i), this);
				sprites.add(mario);

			}else if(type.equals("coin")){
				sprites.add(new Coin(tmpList.get(i), this));

			}else if(type.equals("coinBlock")){
				sprites.add(new CoinBlock(tmpList.get(i), this));

			}else{
				System.out.println("didnt meet any statements: looking for \"" + type + "\"");
			}
		}

	}
	
	//same as the unmarshal method but loads up the empty.json thus "erasing" the map
	void erase(){

		Json ob = Json.load("empty.json");

		//create bricks arrayList and temp arrayList
		sprites = new ArrayList<Sprite>();
		Json tmpList = ob.get("sprites");

		//intializes all of the json bricks into bricks from the tmplist
		for(int i = 0; i < tmpList.size(); i++)
			sprites.add(new Brick(tmpList.get(i)));
	}
		
	
	
}



