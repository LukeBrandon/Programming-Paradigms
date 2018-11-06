
function Controller(model, view){
    this.model = model;
    this.view = view;
    this.key_right = false;
    this.key_left = false;
    let self = this;
    view.canvas.addEventListener("click", function(event) { self.onClick(event); });
    document.addEventListener('keydown', function(event) { self.keyDown(event); }, false);
    document.addEventListener('keyup', function(event) { self.keyUp(event); }, false);
}

Controller.prototype.onClick = function(event){
    this.model.onclick(event.pageX - this.view.canvas.offsetLeft, event.pageY - this.view.canvas.offsetTop);
}

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

Controller.prototype.update = function(){
    this.model.mario.oldPosition();
    let mar = this.model.mario;

    //does movement for mario
	if(this.key_right) mar.x += 10; mar.animate("right");
	if(this.key_left) mar.x -=10; mar.animate("left");
    if(this.key_space && mar.lastTouchCounter < 10) mar.vertVel = -17.0;


}

    


