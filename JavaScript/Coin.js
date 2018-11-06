function Coin(x, y, model, image_url, update, draw){
    this.x = x;
    this.y = y;
    this.vertVel = 0.0;
    this.horVel = randomHorizontalVelocity();
    this.model = model;
    this.image = new Image();
    this.image.src = image_url;
    this.w = 32;
    this.h = 32;
    this.update = update;
    this.draw = draw;
    this.isCoinBlock = false;
    this.isCoin = true;
}


Coin.prototype.update = function(){
    this.vertVel += 2.0;
    this.y += this.vertVel;
    this.lastTouchCounter++;

    console.log();

    //horizontal velocity dampening
    // if(this.horVel < .25 && this.horVel > -.25)
    //     this.horVel = 0.0;
    // else
    //     this.horVel/=1.1;
    // this.x += this.horVel;

    //coins stay on ground
    if(this.y + this.image.height > 400){
        this.vertVel = 0.0;
        this.y = 400-this.image.height;
        this.lastTouchCounter = 0;
    }


}

Coin.prototype.draw = function(ctx){
    ctx.drawImage(this.image, this.x - this.model.screenPos, this.y);
}

function randomHorizontalVelocity(){
    let x = Math.random()*10;
    let neg = Math.random();
    if(neg < .5)
        neg = -1;
    else
        neg = 1;
    this.horVel = neg * x;
    console.log(this.horVel);
}