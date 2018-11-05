
//-------------------SPRITE-----------------------
function Sprite(x, y, image_url, update_method, onclick_method)
{
	this.x = x;
	this.y = y;
	this.image = new Image();
	this.image.src = image_url;
	this.update = update_method;
	this.onclick = onclick_method;
}

Sprite.prototype.set_destination = function(x, y)
{
	this.dest_x = x;
	this.dest_y = y;
}

Sprite.prototype.ignore_click = function(x, y)
{
}

Sprite.prototype.move = function(dx, dy)
{
	this.dest_x = this.x + dx;
	this.dest_y = this.y + dy;
}

Sprite.prototype.go_toward_destination = function()
{
	if(this.dest_x === undefined)
		return;

	if(this.x < this.dest_x)
		this.x++;
	else if(this.x > this.dest_x)
		this.x--;
	if(this.y < this.dest_y)
		this.y++;
	else if(this.y > this.dest_y)
		this.y--;
}

Sprite.prototype.sit_still = function()
{
}