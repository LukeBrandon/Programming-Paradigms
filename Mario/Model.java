import java.util.ArrayList;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.io.File;


class Model{
	ArrayList<Sprite> sprites;	
	int cameraPos;
	Mario mario;	//only instance of mario, instantiated in the unmarshall from JSON file
	static BufferedImage backgroundImage = null;
	int backgroundX;

	Model(){
		sprites = new ArrayList<Sprite>();

		//lazy load background image
		if(backgroundImage == null){
			try{
				backgroundImage = ImageIO.read(new File("images/background.png"));
			}catch(Exception e){}
		}
		this.unmarshal();
		backgroundX = 0;
		cameraPos = 10;
	}//end of model constuctor

	Model(Model old){
		//array list deep copy
		this.sprites = new ArrayList<Sprite>();
		for(int i = 0; i < old.sprites.size(); i++){
			Sprite clone = old.sprites.get(i).cloneMe(this);	//should that be this in this?
			this.sprites.add(clone);
			if(clone.isMario()) 
				this.mario = (Mario)clone;
		}

		this.cameraPos = old.cameraPos;
		this.backgroundX = old.backgroundX;
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


	double evaluateAction(Action action, int depth){
		int d = 22;  //d is the maximum steps in the future to see
		int k = 4;	//k is the number of steps to go before branching again
		//brances d/k times and sees d moves ahead

		// Base case and evaluate the state
		if(depth >= d){
			//favors xPos, coins, less jumps, and not dead
			int deceased = 0;
			if(mario.dead == true)
				deceased = 1;
			else
				deceased = 0;
			return ((5000*mario.coins)+(mario.xPos-250)-(10*mario.numJumps)-(10000000*deceased)); 
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
			double best = copy.evaluateAction(action.jump, depth+1);
			best = Math.max(best,
				copy.evaluateAction(action.runAndJump, depth+1));
			best = Math.max(best,
				copy.evaluateAction(action.run, depth+1));
			return best;
		}
	}

	void doAction(Action i){
		if(i == Action.run){
			mario.oldPosition();
			mario.moveMarioRight(); 
			mario.animateMario("right");

		}else if(i == Action.jump && mario.lastTouchCounter < 7){
			mario.oldPosition();
			mario.jump();
			mario.numJumps ++;

		}else{
			if(mario.lastTouchCounter < 7){
				mario.oldPosition();
				mario.jump();
				mario.moveMarioRight(); 
				mario.animateMario("right");
				mario.numJumps++;
			}
		}
	}//end do action

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
		Json ob = Json.load("level1.json");

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



