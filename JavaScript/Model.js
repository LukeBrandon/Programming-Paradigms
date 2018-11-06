//---------------------MODEL---------------------
function Model()
{
	this.screenPos = 0;
	this.backgroundImage = new Image();
	this.backgroundImage.src = "background.png";
	this.backgroundX = 0;
	this.sprites = [];
	//this.sprites.push(new Sprite(200, 100, "mario.png", Sprite.prototype.sit_still, Sprite.prototype.ignore_click));
	this.mario = new Mario(50, 50, this, "mario1.png", Mario.prototype.update, Mario.prototype.draw);
	this.sprites.push(this.mario);
	this.brick1 = new Brick(350, 300, 150, 100, this, Brick.prototype.update, Brick.prototype.draw);
	this.sprites.push(this.brick1);
	this.coin = new Coin(200, 100, this, "coin.png", Coin.prototype.update, Coin.prototype.draw);
	this.sprites.push(this.coin);
	this.coinblock1 = new CoinBlock(200, 225, this, CoinBlock.prototype.update, CoinBlock.prototype.draw);
	this.sprites.push(this.coinblock1);
}

Model.prototype.update = function()
{
	//updates screen position
	this.screenPos = this.mario.x - 150;
	this.backgroundX = -this.screenPos/3;
	
	for(let i = 0; i < this.sprites.length; i++)
	{
		this.sprites[i].update();
	}
}
