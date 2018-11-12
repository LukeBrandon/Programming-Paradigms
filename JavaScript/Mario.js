class Mario extends Sprite{

    constructor(x, y, model){
        super(x, y, 60, 95, model);
        this.prevX = 0;
        this.prevY = 0;
        this.vertVel = 0.0;
        this.lastTouchCounter = 0;

        this.marioImageCounter = 0;
        this.isMario = true;
        this.image = new Image();
        this.images = [];
        this.leftImages = [];
        this.model = model;
        this.lazyLoad();
    }


    update(){
        //gravity 
        this.vertVel += 2.0;
        this.y += this.vertVel;
        this.lastTouchCounter++;

        //interacting with other sprites
        for(let i = 0; i < this.model.sprites.length; i++){
            let thatSprite = this.model.sprites[i]; //current sprite in for loop

            //checks if colliding and coin block colliding
            if(thatSprite != this && this.collides(thatSprite)) {    
                let dir = this.pushOut(thatSprite);
                if(dir == "bottom" && thatSprite.isCoinBlock)
                    thatSprite.ejectCoin();
            }
        }//end iterating sprites
        
    }//end mario update

    draw(ctx){
        ctx.drawImage(this.image, this.x - this.model.screenPos, this.y);
    }

    oldPosition(){
        this.prevX = this.x;
        this.prevY = this.y;
    }

    animate(dir){
        this.marioImageCounter ++;
        if(dir == "right"){  //animate left
            if(this.marioImageCounter/5 == 0)
                this.image = this.images[0];
            if(this.marioImageCounter/5 == 1)
                this.image = this.images[1];
            if(this.marioImageCounter/5 == 2)
                this.image = this.images[2];
            if(this.marioImageCounter/5 == 3)
                this.image = this.images[3];
            if(this.marioImageCounter/5 == 4)
                this.image = this.images[4];
            //restarts counter at 25
            this.marioImageCounter %= 25;
        }else if(dir == "left"){  //animate right
            if(this.marioImageCounter/5 == 0)
                this.image = this.leftImages[0];
            if(this.marioImageCounter/5 == 1)
                this.image = this.leftImages[1];
            if(this.marioImageCounter/5 == 2)
                this.image = this.leftImages[2];
            if(this.marioImageCounter/5 == 3)
                this.image = this.leftImages[3];
            if(this.marioImageCounter/5 == 4)
                this.image = this.leftImages[4];
            //restarts counter at 25
            this.marioImageCounter %= 25;
        }
    }

    collides(that){
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

    pushOut(that){
            //entering from top
            if(this.y + this.h >= that.y && !(this.prevY + this.h > that.y)){  
                this.y = that.y - this.h;
                this.lastTouchCounter = 0;
                this.vertVel = 0.0;
                return "top";

            //entering from bottom
            }else if(this.y <= that.y + that.h && !(this.prevY < that.y + that.h)){  
                this.y = that.y + that.h;
                this.lastTouchCounter = 100; //so mario cant keep jumping 
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

    lazyLoad(){
        console.log("lazy load");
        this.image1 = new Image();
        this.image2 = new Image();
        this.image3 = new Image();
        this.image4 = new Image();
        this.image5 = new Image();
        this.image1.src = "images/mario1.png";
        this.image2.src = "images/mario2.png";
        this.image3.src = "images/mario3.png";
        this.image4.src = "images/mario4.png";
        this.image5.src = "images/mario5.png";

        this.images.push(this.image1);
        this.images.push(this.image2);
        this.images.push(this.image3);
        this.images.push(this.image4);
        this.images.push(this.image5);

        //sets default image
        this.image = this.images[0];

        this.leftImage1 = new Image();
        this.leftImage2 = new Image();
        this.leftImage3 = new Image();
        this.leftImage4 = new Image();
        this.leftImage5 = new Image();
        this.leftImage1.src = "images/leftMario1.png";
        this.leftImage2.src = "images/leftMario2.png";
        this.leftImage3.src = "images/leftMario3.png";
        this.leftImage4.src = "images/leftMario4.png";
        this.leftImage5.src = "images/leftMario5.png";

        this.leftImages.push(this.leftImage1);
        this.leftImages.push(this.leftImage2);
        this.leftImages.push(this.leftImage3);
        this.leftImages.push(this.leftImage4);
        this.leftImages.push(this.leftImage5);
    }

}
