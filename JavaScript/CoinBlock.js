class CoinBlock extends Sprite{
    constructor(x, y, model){
        super(x, y, 50, 50, model);

        this.image = new Image();
        this.image.src = "coinBlock.png";

        this.depletedImage = new Image();
        this.depletedImage.src = "depletedCoinBlock.png";

        this.coinCount = 5;
        this.isCoinBlock = true;
    }


    update(){

    }

    draw(ctx){
        if(this.coinCount > 0)
            ctx.drawImage(this.image, this.x - this.model.screenPos, this.y);
        else    
            ctx.drawImage(this.depletedImage, this.x - this.model.screenPos, this.y);
    }
}
