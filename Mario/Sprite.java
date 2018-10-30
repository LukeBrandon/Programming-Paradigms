import java.awt.Graphics;
import java.util.ArrayList;

//types of sprite classes inheret this class

abstract class Sprite{
    //member variables
    int xPos, yPos, prevX, prevY, width, height;
    Model model;

    Sprite(){   }

    Sprite(Sprite that, Model newModel){
        model = newModel;
        this.xPos = that.xPos;
        this.yPos = that.yPos;
        this.prevX = that.prevX;
        this.prevY = that.prevY;
        this.height = that.height;
        this.width = that.width;
    }

    abstract void draw(Graphics g, Model model);
    abstract void update(ArrayList<Sprite> sprites);
    abstract Sprite cloneMe(Model model);

    //-------------Identity Methods-----------------
    boolean isABrick(){   return false;  }
    boolean isMario(){   return false;  }
    boolean isACoin(){   return false;   }
    boolean isACoinBlock(){   return false;   }


    //Setter methods
    void setX(int x){
        xPos = x;
    }
    void setY(int y){
        yPos = y;
    }
    void setW(int w){
        width = w;
    }
    void setH(int h){
        height = h;
    }

    //getter methods
    int getX(){
        return xPos;
    }
    int getY(){
        return yPos;
    }
    int getW(){
        return width;
    }
    int getH(){
        return height;
    }
    

    //remembers where sprite was, called right before sprite is moved in the controller
    void oldPosition(){
        prevX = xPos;
        prevY = yPos;
    }
    
    //collision detection method
    boolean collides(Sprite that){
        if(this.yPos + this.height <= that.getY()){     //above
            return false;
        }if(this.xPos + this.width <= that.getX()){     //right side of mario 
            return false;
        }if(this.xPos >= that.getX()+that.getW()){      //left side of mario
            return false;
        }if(this.yPos >= that.getY()+that.getH()){      //below
            return false;
        }
        return true; 
    }

    boolean collidesBottom(Sprite that){
        if(yPos <= that.getY() + that.getH() && !(prevY < that.getY() + that.getH()))
            return true;
        return false;
    }

    //return type that tells which side it collided on
    String pushOut(Sprite that){

        //entering from top
         if(yPos + height >= that.getY() && !(prevY + height > that.getY())){  
            this.yPos = that.getY() - this.height;
            return "top";

        //entering from bottom
        }else if(yPos <= that.getY() + that.getH() && !(prevY < that.getY() + that.getH())){  
            this.yPos = that.getY() + that.getH()+3;
            return "bottom";

        //entering from left
        }else if(xPos + width >= that.getX() && !(prevX + width > that.getX()) ){
            this.xPos = that.getX()  -this.width;   
            return "left";

        //entering from right
        }else if(xPos <= (that.getX() + that.getW()) && !(prevX < (that.getX() + that.getW()) )){ 
            this.xPos = that.getX() +that.getW();
            return "right";

        }else
            return "not";
    }//end of push out method



    //------------JSON--------------
    //Marshalling Method for saving the sprites into the JSON format
	Json marshal()
	{
		Json ob = Json.newObject();
		if(isABrick()){
			ob.add("type", "brick");
		}else if(isMario()){
			ob.add("type", "mario"); 
		}else if(isACoin()){
			ob.add("type", "coin");
		}else if(isACoinBlock()){
			ob.add("type", "coinBlock");
		}
	    ob.add("x", xPos);
	    ob.add("y", yPos);
		ob.add("w", width);
		ob.add("h", height);
	    return ob;
	}


}//end of sprite class