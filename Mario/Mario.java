import java.util.ArrayList;
import java.awt.Graphics;
import java.util.Iterator;
import javax.imageio.ImageIO;
import java.io.IOException;
import java.io.File;
import java.awt.Image;



class Mario extends Sprite{
    static Image[] rightMarioImages = null;
	static Image[] leftMarioImages = null;
    Image marioImage = null;

    int lastTouchCounter;
    int marioCounter;
    int coins;
    int numJumps;
    double vertVel;
    boolean dead;

    Mario(Model m){
        model = m;
        yPos = 300;
        xPos = 250;
        width = 60;
        height = 95;
        lastTouchCounter = 0;
        vertVel = 0;
        coins = 0;
        numJumps = 0;
        dead = false;

        lazyLoad();
    }

    //copy constructor
    Mario(Mario old, Model newModel){
        super(old, newModel);
        this.lastTouchCounter = old.lastTouchCounter;
        this.marioCounter = old.marioCounter;
        this.coins = old.coins;
        this.marioImage = old.marioImage;
        this.numJumps = old.numJumps;
        this.vertVel = old.vertVel;
        this.dead = old.dead;
    }

    //json contrusctor
    Mario(Json ob, Model m){	
        xPos = (int)ob.getDouble("x");
        yPos = (int)ob.getDouble("y");
        width = (int)ob.getDouble("w");
        height = (int)ob.getDouble("h");
        model = m;
        coins = 0;
        lazyLoad();
    }
    
    Mario cloneMe(Model newModel){
        return new Mario(this, newModel);
    }

    void draw(Graphics g, Model model){
        g.drawImage(marioImage, this.xPos - model.cameraPos, this.yPos, null);
    }

    void update(ArrayList<Sprite> sprites){
        updateGravity();
        lastTouchCounter++; //used for dynamic jumped heights

        //Using iterator to determine operations upon collision
        Iterator<Sprite> iterator = sprites.iterator();
        while(iterator.hasNext()){
            Sprite s = iterator.next();

            //if colliding
            if(this.collides(s)){
                String direction = pushOut(s); //side of collision
                if(direction == "top"){
                    lastTouchCounter = 0;
                    vertVel = 0.0;
                }else if(direction == "right"){     
                    //no need to do anything special at this time
                    //besides push out which happens above
                }else if(direction == "left"){     
                    //no need to do anything special at this time
                    //besides push out which happens above
                }else if(direction == "bottom")
                    vertVel = 0.5;
                else{   }

                //if its a coinBlock, then eject coins out of it only if hit from bottom
                if(s.isACoinBlock() && direction == "bottom"){
                    CoinBlock cb = (CoinBlock)s;
                    if(cb.coinCount > 0){
                        cb.ejectCoin();
                        coins++;
                    }
                }
            }//end of if collides 
        }//end iterator while loop

        //if mario has falled to his death 
        if(this.yPos > 600){
            dead = true;
            System.exit(0);
        }

    }//end of update method

    void updateGravity(){
        vertVel += 3.0;
        yPos += vertVel;
    }

    boolean isMario(){  //mario identity
        return true;
    }
    void moveMarioRight(){  //mario move methods
        xPos += 8;
    }
    void moveMarioLeft(){
        xPos -=8;
    }

    //animates mario as he walks
    void animateMario(String direction){
		if(direction == "right"){
			marioImage = rightMarioImages[marioCounter/5];	//makes mario animate every 5 updates (looks better)
			marioCounter++;
			marioCounter%=25;
		}
		else if(direction == "left"){
			marioImage = leftMarioImages[marioCounter/5];
			marioCounter++;
			marioCounter%=25;
		}else{
			System.out.println("Animate mario failed.");
		}
    }

    void jump(){
        vertVel -= 5.5;
    }

    void lazyLoad(){
        //lazy loading mario Images
		if(rightMarioImages == null){
			rightMarioImages = new Image[5];
			try{
				rightMarioImages[0] = ImageIO.read(new File("mario1.png"));
				rightMarioImages[1] = ImageIO.read(new File("mario2.png"));
				rightMarioImages[2] = ImageIO.read(new File("mario3.png"));
				rightMarioImages[3] = ImageIO.read(new File("mario4.png"));
				rightMarioImages[4] = ImageIO.read(new File("mario5.png"));
			}catch(IOException e){}
		}
		if(leftMarioImages == null){
			leftMarioImages = new Image[5];
			try{
				leftMarioImages[0] = ImageIO.read(new File("leftMario1.png"));
				leftMarioImages[1] = ImageIO.read(new File("leftMario2.png"));
				leftMarioImages[2] = ImageIO.read(new File("leftMario3.png"));
				leftMarioImages[3] = ImageIO.read(new File("leftMario4.png"));
				leftMarioImages[4] = ImageIO.read(new File("leftMario5.png"));
			}catch(IOException e){}
        }//end lazy loading

        marioImage = rightMarioImages[0];   //makes mario appear on startup
    }
    

}//end of Marioclass