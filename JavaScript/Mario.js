function Mario(x, y, model, image_url, update, draw){
    this.x = x;
    this.y = y;
    this.prevX = 0;
    this.prevY = 0;
    this.vertVel = 0.0;
    this.lastTouchCounter = 0;
    this.model = model;
    this.image = new Image();
    this.image.src = image_url;
    //image arrays
    this.marioImageCounter = 0;
    this.w = 60;
    this.h = 95;
    //this.w = this.image.width;        //broken
    //this.h = this.image.height;       //broken
    this.update = update;
    this.draw = draw;
    this.isCoinBlock = false;
    lazyLoad();
}

Mario.prototype.update = function(){
    //gravity 
    this.vertVel += 2.0;
    this.y += this.vertVel;
    this.lastTouchCounter++;

    //interacting with other sprites
    for(let i = 0; i < this.model.sprites.length; i++){
        let thatSprite = this.model.sprites[i]; //current sprite in for loop

        //checks if colliding
        if((thatSprite != this) && this.collides(thatSprite)) {
            let dir = this.pushOut(thatSprite);

            if((dir == "bottom") && (thatSprite.isCoinBlock == true)){
                console.log("should eject coin");
                thatSprite.blockHit = true;
            }

            // broken bc mario always colliding??????
            // if(thisSprite.isCoin == true)
            //     this.model.sprites.splice(i,1);
        }
    }

    //stops on ground
    if(this.y + this.image.height > 400){
        this.vertVel = 0.0;
        this.y = 400-this.image.height;
        this.lastTouchCounter = 0;
    }
}//end mario update

Mario.prototype.draw = function(ctx){
    ctx.drawImage(this.image, this.x - this.model.screenPos, this.y);
}

Mario.prototype.oldPosition = function(){
    this.prevX = this.x;
    this.prevY = this.y;
}

Mario.prototype.animate = function(dir){
    this.marioImageCounter ++;
    if(dir == "right"){  //animate left
        if(this.marioImageCounter/5 == 0)
            this.image.src = "mario1.png"
        if(this.marioImageCounter/5 == 1)
            this.image.src = "mario2.png";
        if(this.marioImageCounter/5 == 2)
            this.image.src = "mario3.png";
        if(this.marioImageCounter/5 == 3)
            this.image.src = "mario4.png";
        if(this.marioImageCounter/5 == 4)
            this.image.src = "mario5.png";
        //restarts counter at 25
        this.marioImageCounter %= 25;
    }else if(dir == "left"){  //animate right
        if(this.marioImageCounter/5 == 0)
            this.image.src = "leftMario1.png"
        if(this.marioImageCounter/5 == 1)
            this.image.src = "leftMario2.png";
        if(this.marioImageCounter/5 == 2)
            this.image.src = "leftMario3.png";
        if(this.marioImageCounter/5 == 3)
            this.image.src = "leftMario4.png";
        if(this.marioImageCounter/5 == 4)
            this.image.src = "leftMario5.png";
        //restarts counter at 25
        this.marioImageCounter %= 25;
    }
}

Mario.prototype.collides = function(that){
    if(this.y + this.h <= that.y){     //above
        return false;
    }else if(this.x + this.w <= that.x){     //right side of mario 
        return false;
    }else if(this.x >= that.x + that.w){      //left side of mario
        return false;
    }else if(this.y >= that.y + that.h){      //below
        return false;
    }else
        return true; 
}

Mario.prototype.pushOut = function(that){
        //entering from top
        if(this.y + this.h >= that.y && !(this.prevY + this.h > that.y)){  
            this.y = that.y - this.h;
            this.lastTouchCounter = 0;
            this.vertVel = 0.0;
            return "top";

        //entering from bottom
        }else if(this.y <= that.y + that.h && !(this.prevY < that.y + that.h)){  
            this.y = that.y + that.h;
            this.vertVel = 0.2;
            return "bottom";

        //entering from left
        }else if(this.x + this.w >= that.x && !(this.prevX + this.w > that.x) ){
            this.x = that.x  - this.w;   
            return "left";

        //entering from right
        }else if(this.x <= (that.x + that.w) && !(this.prevX < (that.x + that.w) )){ 
            this.x = that.x + that.w;
            return "right";

        }else
            return "not";

}

function lazyLoad(){
    
}
