
//-------------------SPRITE-----------------------
function Sprite(x, y, image_url, update)
{
	this.x = x;
	this.y = y;
	this.image = new Image();
	this.image.src = image_url;
	this.update = update;

}
