import javax.imageio.ImageIO;
import java.io.IOException;
import java.io.File;
import java.awt.image.BufferedImage;
import java.awt.Graphics;
import java.awt.Image;
import java.util.Iterator;
import java.util.ArrayList;



class CoinBlock extends Sprite{
    BufferedImage coinBlockImage = null;
    BufferedImage emptyBlockImage = null;
    Model model;
    int coinCounter;
    boolean ejectCoin;

    CoinBlock(int x, int y, Model m){
        lazyLoad();
        width = coinBlockImage.getWidth();
        height = coinBlockImage.getHeight();
        xPos = x;
        yPos = y;
        model = m;
        coinCounter = 5;
    }

    //json constructor
    CoinBlock(Json ob, Model m){	
        lazyLoad();
        xPos = (int)ob.getDouble("x");
        yPos = (int)ob.getDouble("y");
        width = (int)ob.getDouble("w");
        height = (int)ob.getDouble("h");
        model = m;
        coinCounter = 5;
    }

    void draw(Graphics g, Model model){
        if(coinCounter>0)
            g.drawImage(coinBlockImage, xPos - model.cameraPos, yPos, null);
        else    
            g.drawImage(emptyBlockImage, xPos - model.cameraPos, yPos, null);
    }

    void update(ArrayList<Sprite> sprites){

        if(coinCounter > 0 && ejectCoin == true){
            Coin coin = new Coin(this.xPos+7, this.yPos-35, model);
            sprites.add(coin);
            coinCounter--;
            ejectCoin = false;
        }
    }

    //identity method
    boolean isACoinBlock(){
        return true;
    }

    void ejectCoin(){
        ejectCoin = true;
    }

    void placeCoinBlock(int x, int y){
        Coin coin = new Coin(x,y,model);
    }

    void lazyLoad(){
        if(coinBlockImage == null){
			try{
				coinBlockImage = ImageIO.read(new File("coinBlock.png"));
                emptyBlockImage = ImageIO.read(new File("depletedCoinBlock.png"));
                
			}catch(Exception e){}
        }
    }


}   //end CoinBlock Class