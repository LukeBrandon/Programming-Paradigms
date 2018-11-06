
function Controller(model, view){
    this.model = model;
    this.view = view;
    this.key_right = false;
    this.key_left = false;
    let self = this;
    //view.canvas.addEventListener("click", function(event) { self.onClick(event); });
    document.addEventListener('keydown', function(event) { self.keyDown(event); }, false);
    document.addEventListener('keyup', function(event) { self.keyUp(event); }, false);
    document.addEventListener('mousedown', function(event) {self.mouseDown(event); }, false);
    document.addEventListener('mouseup', function(event) {self.mouseUp(event); }, false);

}

// Controller.prototype.onClick = function(event){
//     this.model.onclick(event.pageX - this.view.canvas.offsetLeft, event.pageY - this.view.canvas.offsetTop);
// }

Controller.prototype.keyDown = function(event){
	if(event.keyCode == 39) this.key_right = true;
	else if(event.keyCode == 37) this.key_left = true;
    else if(event.keyCode == 32) this.key_space = true;
}

Controller.prototype.keyUp = function(event){
	if(event.keyCode == 39) this.key_right = false;
	else if(event.keyCode == 37) this.key_left = false;
    else if(event.keyCode == 32) this.key_space = false;
}

// Controller.prototype.mouseDown = function(event){
//     //console.log("presed down");
//     this.mouseDown(event.pageX - this.view.canvas.offsetLeft, event.pageY - this.view.canvas.offsetTop);
// }

// Controller.prototype.mouseUp = function(event){
//     console.log("mousereleased");
//     this.mouseUp(event.pageX - this.view.canvas.offsetLeft, event.pageY - this.view.canvas.offsetTop);
// }

Controller.prototype.update = function(){
    this.model.mario.oldPosition();

    //does movement for mario
	if(this.key_right) {
        this.model.mario.x += 10; 
        this.model.mario.animate("right");
    }
	if(this.key_left){
        this.model.mario.x -=10; 
        this.model.mario.animate("left");
    }
    if(this.key_space && this.model.mario.lastTouchCounter < 10) this.model.mario.vertVel = -17.0;


}

    


