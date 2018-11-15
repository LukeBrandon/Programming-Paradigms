class CoinBlock extends Sprite{
    constructor(x, y, model){
        super(x, y, 50, 50, model);

        this.image = new Image();
        this.image.src = "images/coinBlock.png";

        this.depletedImage = new Image();
        this.depletedImage.src = "images/depletedCoinBlock.png";

        this.blockHit = false;
        this.coinCount = 5;
        this.isCoinBlock = true;
    }


    update(){   }

    draw(ctx){
        if(this.coinCount > 0)
            ctx.drawImage(this.image, this.x - this.model.screenPos, this.y);
        else    
            ctx.drawImage(this.depletedImage, this.x - this.model.screenPos, this.y);
    }

    ejectCoin(){
        if(this.coinCount > 0){
            const tempCoin = new Coin(this.x, this.y, this.model);
            this.model.sprites.push(tempCoin);
            this.coinCount--;
        }else{
            console.log("coin Block is out of coins");
        }
    }
}
