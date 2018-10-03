import javax.swing.JPanel;
import java.awt.Graphics;
import java.awt.Color;

class View extends JPanel{
	Model model;
	int marioCounter;
	
	View(Controller c, Model m){
		model = m;
		c.setView(this);		
	}//end of constructor


//--------------------Paint Component------------------------------
	public void paintComponent(Graphics g){ 
		g.drawImage(model.backgroundImage, model.backgroundX, -326,null);

		//draw all sprites
		for(int i = 0; i < model.sprites.size(); i++){
			model.sprites.get(i).draw(g, model);
		}
	
	}
}
