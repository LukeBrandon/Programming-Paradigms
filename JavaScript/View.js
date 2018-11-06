function View(model)
{
	this.model = model;
	this.canvas = document.getElementById("myCanvas");
}

View.prototype.update = function()
{
	let ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, 1000, 500);
    
    //draw ground
    ctx.beginPath();
    ctx.moveTo(-500,400);
    ctx.lineTo(1000,400);
    ctx.stroke();

    //draws all sprites
	for(let i = 0; i < this.model.sprites.length; i++)
	{
        this.model.sprites[i].draw(ctx);
	}
}