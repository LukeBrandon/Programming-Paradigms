//---------------------MODEL---------------------
function Model()
{
	this.screenPos = 0;
	this.sprites = [];
	//this.sprites.push(new Sprite(200, 100, "mario.png", Sprite.prototype.sit_still, Sprite.prototype.ignore_click));
	this.mario = new Mario(50, 50, this, "mario1.png", Mario.prototype.update, Mario.prototype.draw);
	this.sprites.push(this.mario);
	this.brick1 = new Brick(350, 300, 150, 100, this, Brick.prototype.update, Brick.prototype.draw);
	this.sprites.push(this.brick1);
}

Model.prototype.update = function()
{
	//updates screen position
	this.screenPos = this.mario.x - 150;
	
	for(let i = 0; i < this.sprites.length; i++)
	{
		this.sprites[i].update();
	}
}

Model.prototype.onclick = function(x, y)
{
	for(let i = 0; i < this.sprites.length; i++)
	{
		this.sprites[i].onclick(x, y);
	}
}

Model.prototype.move = function(dx, dy)
{
	this.turtle.move(dx, dy);
}