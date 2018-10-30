import javax.imageio.ImageIO;
import java.io.File;
import java.awt.image.BufferedImage;
import java.awt.Graphics;
import java.util.ArrayList;

class CoinBlock extends Sprite{
    BufferedImage coinBlockImage = null;
    BufferedImage emptyBlockImage = null;
    int coinCount;
    boolean blockHit;

    CoinBlock(int x, int y, Model m){
        lazyLoad();
        width = coinBlockImage.getWidth();
        height = coinBlockImage.getHeight();
        xPos = x;
        yPos = y;
        model = m;
        coinCount = 5;
        blockHit = false;
    }

    //copy constructor
    CoinBlock(CoinBlock old, Model newModel){
        super(old, newModel);
        this.coinBlockImage = old.coinBlockImage;
        this.emptyBlockImage = old.emptyBlockImage;
        this.blockHit = old.blockHit;
        this.coinCount = old.coinCount;
    }

    //json constructor
    CoinBlock(Json ob, Model m){	
        lazyLoad();
        xPos = (int)ob.getDouble("x");
        yPos = (int)ob.getDouble("y");
        width = (int)ob.getDouble("w");
        height = (int)ob.getDouble("h");
        model = m;
        coinCount = 5;
    }

    CoinBlock cloneMe(Model newModel){
        return new CoinBlock(this, newModel);
    }

    void draw(Graphics g, Model model){
        if(coinCount>0)
            g.drawImage(coinBlockImage, xPos - model.cameraPos, yPos, null);
        else    
            g.drawImage(emptyBlockImage, xPos - model.cameraPos, yPos, null);
    }

    void update(ArrayList<Sprite> sprites){
        //checking if hit by mario
        if(coinCount > 0 && blockHit == true){
            Coin coin = new Coin(this.xPos+7, this.yPos-35, model);
            sprites.add(coin);
            coinCount--;
            blockHit = false;
        }
    }

    //identity method
    boolean isACoinBlock(){
        return true;
    }

    void ejectCoin(){
        blockHit = true;
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