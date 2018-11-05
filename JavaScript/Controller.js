
    function Controller(model, view){
        this.model = model;
        this.view = view;
        this.key_right = false;
        this.key_left = false;
        this.key_up = false;
        this.key_down = false;
        let self = this;
        view.canvas.addEventListener("click", function(event) { self.onClick(event); });
        document.addEventListener('keydown', function(event) { self.keyDown(event); }, false);
        document.addEventListener('keyup', function(event) { self.keyUp(event); }, false);
    }

    Controller.prototype.onClick = function(event)
{
	this.model.onclick(event.pageX - this.view.canvas.offsetLeft, event.pageY - this.view.canvas.offsetTop);
}

Controller.prototype.keyDown = function(event)
{
	if(event.keyCode == 39) this.key_right = true;
	else if(event.keyCode == 37) this.key_left = true;
	else if(event.keyCode == 38) this.key_up = true;
	else if(event.keyCode == 40) this.key_down = true;
}

Controller.prototype.keyDown = function(event)
{
	if(event.keyCode == 39) this.key_right = true;
	else if(event.keyCode == 37) this.key_left = true;
	else if(event.keyCode == 38) this.key_up = true;
	else if(event.keyCode == 40) this.key_down = true;
}

Controller.prototype.keyUp = function(event)
{
	if(event.keyCode == 39) this.key_right = false;
	else if(event.keyCode == 37) this.key_left = false;
	else if(event.keyCode == 38) this.key_up = false;
	else if(event.keyCode == 40) this.key_down = false;
}

Controller.prototype.update = function()
{
	let dx = 0;
	let dy = 0;
	if(this.key_right) dx++;
	if(this.key_left) dx--;
	if(this.key_up) dy--;
	if(this.key_down) dy++;
	if(dx != 0 || dy != 0)
		this.model.move(dx, dy);
}

    


