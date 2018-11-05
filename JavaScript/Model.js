//---------------------MODEL---------------------
function Model()
{
	this.sprites = [];
	this.sprites.push(new Sprite(200, 100, "lettuce.png", Sprite.prototype.sit_still, Sprite.prototype.ignore_click));
	this.mario = new Sprite(50, 50, "mario.png", Sprite.prototype.go_toward_destination, Sprite.prototype.set_destination);
	this.sprites.push(this.mario);
}

Model.prototype.update = function()
{
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