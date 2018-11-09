class Coin extends Sprite{

    constructor(x, y, model){
        super(x,y, 32, 32, model);
        this.vertVel = -15.0;
        this.horVel = (Math.random()*20)-10;
        this.model = model;
        this.isCoin = true;
        this.lazyLoad();
    }

    isCoin(){
        return true;
    }

    update(){
        this.vertVel += 2.0;
        this.y += this.vertVel;
        this.lastTouchCounter++;

        //horizontal velocity dampening
        if(this.horVel < .25 && this.horVel > -.25)
            this.horVel = 0.0;
        else
            this.horVel/=1.1;
        this.x += this.horVel;

        //deleting when falling off screen
        for(let i = 0; i < this.model.sprites.length; i++){
            let thisOne = this.model.sprites[i];
            
            if(thisOne.y + thisOne.h > 500){
                this.model.sprites.splice(i,1);     
            }
        }

    } //end coin update

    draw(ctx){
        ctx.drawImage(this.image, this.x - this.model.screenPos, this.y);
    }

    lazyLoad(){
        this.image = new Image();
        this.image.src = "images/coin.png";
    }
}