class Model{
	constructor(){
		this.screenPos = 0;
		this.backgroundImage = new Image();
		this.backgroundImage.src = "images/background.png";
		this.backgroundX = 0;
		this.sprites = [];

		this.mario = new Mario(50, 50, this);
		this.sprites.push(this.mario);
		this.brick1 = new Brick(350, 300, 150, 100, this);
		this.sprites.push(this.brick1);
		this.coin = new Coin(200, 100, this);
		this.sprites.push(this.coin);
		this.coinblock1 = new CoinBlock(200, 210, this);
		this.sprites.push(this.coinblock1);
	}

	update(){
		//updates screen position
		this.screenPos = this.mario.x - 150;
		this.backgroundX = -this.screenPos/3;
		
		for(let i = 0; i < this.sprites.length; i++){
			this.sprites[i].update();
		}

	}//end model update

}//end model class

