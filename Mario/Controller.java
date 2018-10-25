import java.awt.event.MouseListener;
import java.awt.event.MouseEvent;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.event.KeyListener;
import java.awt.event.KeyEvent;
import java.util.ArrayList;

class Controller implements ActionListener, MouseListener, KeyListener{

	View view;
	Model model;
	
	//variables used for the key listener
	boolean keyLeft;
	boolean keyRight;
	boolean keyUp;
	boolean keyDown;
	boolean keyS;
	boolean keyL;
	boolean keyE;
	boolean keyZ;
	boolean keySpace;
	boolean keyC;

	//used to make so mario cant fail a jump in between updates
	ArrayList<String> hasBeenPressed = new ArrayList<String>();

	
	Controller(Model m){
		model = m;
	}

	public void actionPerformed(ActionEvent e){	}
	
	void setView(View v){   view = v;   }

	//Key listener implementation
	public void keyPressed(KeyEvent e)
	{
		switch(e.getKeyCode())
		{
			case KeyEvent.VK_RIGHT: keyRight = true; break;
			case KeyEvent.VK_LEFT: keyLeft = true; break;
			case KeyEvent.VK_UP: keyUp = true; break;
			case KeyEvent.VK_DOWN: keyDown = true; break;
			case KeyEvent.VK_S: keyS = true; break;
			case KeyEvent.VK_L: keyL = true; break;
			case KeyEvent.VK_E: keyE = true; break;
			case KeyEvent.VK_Z: keyZ = true; break;
			case KeyEvent.VK_SPACE: keySpace = true; hasBeenPressed.add("space"); break;
			case KeyEvent.VK_C: keyC = true; break;
		}
	}

	public void keyReleased(KeyEvent e)
	{
		switch(e.getKeyCode())
		{
			case KeyEvent.VK_RIGHT: keyRight = false; break;
			case KeyEvent.VK_LEFT: keyLeft = false; break;
			case KeyEvent.VK_UP: keyUp = false; break;
			case KeyEvent.VK_DOWN: keyDown = false; break;
			case KeyEvent.VK_S: keyS = false; break;
			case KeyEvent.VK_L: keyL = false; break;
			case KeyEvent.VK_E: keyE = false; break;
			case KeyEvent.VK_Z: keyZ = false; break;
			case KeyEvent.VK_SPACE: keySpace = false; break;
			case KeyEvent.VK_C: keyC = false; break;

		}
	}

	public void keyTyped(KeyEvent e){   }
	
	//MouseListener implementation
	public void mousePressed(MouseEvent e){
		//if left mouse button presed, then place regular brick
		if(e.getButton() == MouseEvent.BUTTON1){
			model.setStart(e.getX(), e.getY());
		}else if(e.getButton() == MouseEvent.BUTTON3){	//right mouse places coin block
			placeCoinBlock(e.getX(), e.getY());
		}else
			System.out.println("other mouse button pressed");
	}
	public void mouseReleased(MouseEvent e){  
		//if its the left mouse button then regular brick
		if(e.getButton() == MouseEvent.BUTTON1)
			model.setEnd(e.getX(), e.getY());
	}
	public void mouseEntered(MouseEvent e) {    }
	public void mouseExited(MouseEvent e) {    }
	public void mouseClicked(MouseEvent e) {    }

	void placeCoinBlock(int x, int y){
		//add coin block to sprites
		model.sprites.add(new CoinBlock(x + model.cameraPos,y,model));
    }

	//-----------------UPDATE---------------------------
	void update(){
		// Evaluate each possible action
		double score_run = model.evaluateAction(model.run, 0);
		double score_jump = model.evaluateAction(model.jump, 0);
		double score_run_and_jump = model.evaluateAction(model.runAndJump, 0);

		//double score_run_back = model.evaluateAction(model.runBack, 0);

		System.out.println("Run Score: " + score_run);
		System.out.println("Jump Score: " + score_jump);
		System.out.println("Run and Jump Score: " + score_run_and_jump);
		System.out.println("--------------------------------------");

		// Do the best one
		if(score_run > score_jump && score_run > score_run_and_jump)
			model.doAction(model.run);
		else if(score_jump > score_run_and_jump)
			model.doAction(model.jump);
		else
			model.doAction(model.runAndJump);


		//------START OF NON AI STUFF---------------
		model.mario.oldPosition();

		if(keyRight){
			model.mario.moveMarioRight(); model.mario.animateMario("right");
		}
		if(keyLeft){ 
			model.mario.moveMarioLeft();  model.mario.animateMario("left");
		}
		if(keyS) model.marshal();		//saves the map to map.json
		if(keyL) model.unmarshal();		//loads the map from map.json
		if(keyE) model.erase();			//erases the map by loading an empty map
		if(keyZ) model.undo();			//undoes a brick placement
		if(keySpace) {
			hasBeenPressed.add(hasBeenPressed.size(),"space");
		}

		
		//checking and executing jumping buffer
		if(hasBeenPressed.size()>=1){
			for(int i = 0; i < hasBeenPressed.size(); i++){
				if(hasBeenPressed.get(i) == "space" && model.mario.lastTouchCounter < 6){
					model.mario.vertVel -= 3.5;
				}
			}
			while(hasBeenPressed.size()>0){
				hasBeenPressed.remove(0);
			}
		}	
		
	}//end of update method
	
	

}
