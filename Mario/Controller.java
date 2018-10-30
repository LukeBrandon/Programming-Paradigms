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

	int x1, y1;

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
			x1 = e.getX();
			y1 = e.getY();
		
		//right mouse places coin block
		}else if(e.getButton() == MouseEvent.BUTTON3){	
			model.sprites.add(new CoinBlock( e.getX()+model.cameraPos, e.getY(), model) );
		
		}else
			System.out.println("other mouse button pressed");
	}

	public void mouseReleased(MouseEvent e){  
		if(e.getButton() == MouseEvent.BUTTON1){
			model.createBrick(x1,y1,e.getX(), e.getY());  //add brick to sprites
		}
	}
	public void mouseEntered(MouseEvent e) {    }
	public void mouseExited(MouseEvent e) {    }
	public void mouseClicked(MouseEvent e) {    }

	//-----------------UPDATE---------------------------
	void update(){
		model.mario.oldPosition();
		//Evaluate each possible action
		double score_run = model.evaluateAction(Action.run, 0);
		double score_jump = model.evaluateAction(Action.jump, 0);
		double score_run_and_jump = model.evaluateAction(Action.runAndJump, 0);


		// Do the best one
		if(score_run > score_jump && score_run > score_run_and_jump)
			model.doAction(Action.run);
		else if(score_jump > score_run_and_jump)
			model.doAction(Action.jump);

		else
			model.doAction(Action.runAndJump);


		//------START OF NON AI STUFF---------------
		//model.mario.oldPosition();

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
		if(keySpace && model.mario.lastTouchCounter < 6) {
			hasBeenPressed.add(hasBeenPressed.size(),"space");
		}

		
		//checking and executing jumping buffer
		if(hasBeenPressed.size()>=1){
			for(int i = 0; i < hasBeenPressed.size(); i++){
				if(hasBeenPressed.get(i) == "space" && model.mario.lastTouchCounter < 6){
					model.mario.jump();
				}
			}
			while(hasBeenPressed.size()>0){
				hasBeenPressed.remove(0);  //removes all after they were evaluated
			}
		}	
		
	}//end of update method
	

}
