class Model{
	constructor(){
		this.screenPos = 0;
		this.backgroundImage = new Image();
		this.backgroundImage.src = "images/background.png";
		this.backgroundX = 0;
		this.sprites = [];

		this.initializeMap();
	}

	update(){
		//updates screen position
		this.screenPos = this.mario.x - 150;
		this.backgroundX = -this.screenPos/3;
		
		for(let i = 0; i < this.sprites.length; i++){
			this.sprites[i].update();
		}

	}//end model update

	initializeMap(){
		this.mario = new Mario(50, 50, this);
		this.sprites.push(this.mario);

		//other playe for multiplayer purposes
		this.otherPlayer = new Mario(50,50,this);
		this.sprites.push(this.otherPlayer);

		this.ground = new Brick(-500, 400, 4000, 100, this);
		this.sprites.push(this.ground);
		this.brick0 = new Brick(-500, 0, 500, 400, this);
		this.sprites.push(this.brick0);
		this.brick1 = new Brick(350, 300, 150, 100, this);
		this.sprites.push(this.brick1);
		this.brick2 = new Brick(350, 50, 150, 100, this);
		this.sprites.push(this.brick2);
		this.coinblock1 = new CoinBlock(200, 210, this);
		this.sprites.push(this.coinblock1);
		this.coinblock2 = new CoinBlock(500, 120, this);
		this.sprites.push(this.coinblock2);
		this.coinblock3 = new CoinBlock(600, 205, this);
		this.sprites.push(this.coinblock3);

		this.goomba1 = new Goomba(100, 200, this);
		this.sprites.push(this.goomba1);
	}

}//end model class

