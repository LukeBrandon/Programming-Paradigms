import java.util.ArrayList;
import java.awt.Graphics;
import java.util.Iterator;
import javax.imageio.ImageIO;
import java.io.IOException;
import java.io.File;
import java.awt.Image;
import java.util.ArrayList;



class Mario extends Sprite{
    static Image[] rightMarioImages = null;
	static Image[] leftMarioImages = null;
    Image marioImage = null;
    int marioCounter;
    Model model;
    int coins;

    Mario(Model m){
        yPos = 300; //should drop onto the ground some
        xPos = 250;
        width = 60;
        height = 95;
        model = m;
        coins = 0;  //player starts with 0 coins

        lazyLoad();
    }

    //json contrusctor
    Mario(Json ob, Model m){	
        xPos = (int)ob.getDouble("x");
        yPos = (int)ob.getDouble("y");
        width = (int)ob.getDouble("w");
        height = (int)ob.getDouble("h");
        vertVel = ob.getDouble("vertVel");
        model = m;
        coins = 0;
        lazyLoad();
	}


    void draw(Graphics g, Model model){
        g.drawImage(marioImage, this.xPos - model.cameraPos, this.yPos, null);
    }


    void update(ArrayList<Sprite> sprites){
        String direction;

        //accelelerates downwards
        vertVel += 1.3;
        yPos += vertVel;
        lastTouchCounter++; //used for dynamic jumped heights

        //Using iterator to determine operations upon collision
        Iterator<Sprite> iterator = sprites.iterator();
        while(iterator.hasNext()){
            Sprite s = iterator.next();

            //only push out when colliding with a brick
            if(s.isABrick()){
                if(s!= this && collides(s)){
                    pushOut(s);
                }
            }

            //if its a coin, then delete the coin and add 1 to coins stat
            if(s.isACoin()){
                if(s!= this && collides(s)){
                    iterator.remove();
                    coins++;
                    System.out.println("Coins: " + coins);
                }
            }

            //if its a coinBlock, then eject coins out of it only if hit from bottom
            if(s.isACoinBlock()){
                if(s!= this && collides(s)){
                    if(collidesBottom(s)){
                        CoinBlock cb = (CoinBlock)s;
                        cb.ejectCoin();
                    }
                    pushOut(s);
                }
            }

        }//end while loop


        //if mario has falled to his death 
        if(this.yPos > 700)
            System.exit(0);

    }//end of update method


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


}//end of class