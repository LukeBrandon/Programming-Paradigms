function CoinBlock(x, y, model, update, draw){
    this.x = x;
    this.y = y;
    this.model = model;
    this.image = new Image();
    this.image.src = "coinBlock.png";;
    this.depletedImage = new Image();
    this.depletedImage.src = "depletedCoinBlock.png";
    this.w = 50;
    this.h = 50;
    this.update = update;
    this.draw = draw;
    this.isCoinBlock = true;
    this.isCoin = false;
    this.blockHit = false;
    this.coinCount = 5;
}

CoinBlock.prototype.update = function(){
    if(this.coinCount > 0 && this.blockHit == true){
        let coin = new Coin(this.x + 7, this.y - 35, this.model);
        //this.model.sprites.push(coin);
        this.coinCount--;
        this.blockHit = false;
    }
}

CoinBlock.prototype.draw = function(ctx){
    if(this.coinCount > 0)
        ctx.drawImage(this.image, this.x - this.model.screenPos, this.y);
    else    
        ctx.drawImage(this.depletedImage, this.x - this.model.screenPos, this.y);
}
