import javax.imageio.ImageIO;
import java.io.File;
import java.awt.image.BufferedImage;
import java.awt.Graphics;
import java.util.Iterator;
import java.util.ArrayList;
import java.util.Random;


class Coin extends Sprite{
    BufferedImage coinImage = null;
    double horVel;
    double vertVel;

    Coin(int x, int y, Model m){
        model = m;
        lazyLoad();

        xPos = x;
        yPos = y;
        width = coinImage.getWidth();
        height = coinImage.getHeight();
        vertVel = -10.0;
        horVel = randomHorizontalVelocity();        
    }

    //copy constructor
    Coin(Coin old, Model newModel){
        super(old, newModel);
        this.coinImage = old.coinImage;
        this.vertVel = old.vertVel;
        this.horVel = old.horVel;
    }

    //json constructor
    Coin(Json ob, Model m){	
        xPos = (int)ob.getDouble("x");
        yPos = (int)ob.getDouble("y");
        width = (int)ob.getDouble("w");
        height = (int)ob.getDouble("h");
        horVel = randomHorizontalVelocity();
        model = m;
    }
    
    Coin cloneMe(Model newModel){
        return new Coin(this, newModel);
    }

    void draw(Graphics g, Model model){
        g.drawImage(coinImage, xPos - model.cameraPos, yPos, null);
    }

    void update(ArrayList<Sprite> sprites){
        //coins come to complete stop bc if dividing forever, they never stop
        if(horVel < .25 && horVel > -.25)
            horVel = 0.0;
        else
            horVel/=1.1;
        vertVel += 1.0;     //gravity
        yPos += vertVel;
        xPos += horVel;     //horizontal velcity

        //coin collision with bricks
        Iterator<Sprite> iterator = sprites.iterator();
        while(iterator.hasNext()){
            Sprite s = iterator.next();

            //coins get deleted when they fall of screen
            if(s.isACoin() && s.yPos > 700){
                iterator.remove(); 
            }
        }
    }//end update method

    boolean isACoin(){
        return true;
    }

    void lazyLoad(){
		if(coinImage == null){
			try{
				coinImage = ImageIO.read(new File("images/coinImage.png"));
			}catch(Exception e){}
        }
    }

    double randomHorizontalVelocity(){
        double rangeMin = -10.0;
        double rangeMax = 10.0;
        Random r = new Random();
        //get random value
        double randomValue = rangeMin + (rangeMax - rangeMin) * r.nextDouble();
        return randomValue;
    }

}   //end of coin class