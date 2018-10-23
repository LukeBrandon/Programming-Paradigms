import java.awt.Graphics;
import java.awt.Color;
import java.util.ArrayList;

class Brick extends Sprite{
	
	Brick(int xtemp, int ytemp, int wtemp, int htemp, Model m){
		xPos = xtemp;
		yPos = ytemp;
		width = wtemp;
		height = htemp;
		model = m;
	}
	
	//copy constructor
	Brick(Brick that, Model newModel){
        super(that, newModel);
    }

	//json constructor
	Brick(Json ob){	
		xPos = (int)ob.getDouble("x");
		yPos = (int)ob.getDouble("y");
		width = (int)ob.getDouble("w");
		height = (int)ob.getDouble("h");
	}

	Brick cloneMe(Model newModel){
		return new Brick(this, newModel);
	}

	//draw method
	void draw(Graphics g, Model model){
		g.setColor(new Color(255,255,255));		
		g.drawRect(xPos - model.cameraPos, yPos, width, height); //drawing bricks while subtracting camera position
	}

	//update method
	void update(ArrayList<Sprite> sprites){}

	boolean isABrick(){
		return true;
	}

	

}//end of Brick class