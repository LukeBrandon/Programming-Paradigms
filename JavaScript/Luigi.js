class Luigi extends Sprite{

    constructor(x, y, model){
        super(x, y, 60, 95, model);
        this.prevX = 0;
        this.prevY = 0;
        this.vertVel = 0.0;
        this.lastTouchCounter = 0;

        this.luigiImageCounter = 0;
        this.isMario = true;
        this.image = new Image();
        this.images = [];
        this.leftImages = [];
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
                
                //Goomba logic
                if(thatSprite.isGoomba){
                    if(dir == "top"){  //his goomba from above
                        console.log("Mario killed Goomba");
                        this.model.sprites.splice(i,1);   //deletes goomba
                        this.model.mario.vertVel = -10.0; //makes mario bounce on goomba
                    }
                    if(dir != "top"){
                        console.log("Mario Killed by goomba");
                    }
                }

            }
        }//end iterating sprites
        
    }//end mario update

    draw(ctx){
        ctx.drawImage(this.image, this.x - this.model.screenPos, this.y);
    } 

    animate(dir){
        this.luigiImageCounter ++;
        if(dir == "right"){  //animate left
            if(this.luigiImageCounter/5 == 0)
                this.image = this.images[0];
            if(this.luigiImageCounter/5 == 1)
                this.image = this.images[1];
            if(this.luigiImageCounter/5 == 2)
                this.image = this.images[2];
            if(this.luigiImageCounter/5 == 3)
                this.image = this.images[3];
            if(this.luigiImageCounter/5 == 4)
                this.image = this.images[4];
            //restarts counter at 25
            this.luigiImageCounter %= 25;
        }else if(dir == "left"){  //animate right
            if(this.luigiImageCounter/5 == 0)
                this.image = this.leftImages[0];
            if(this.luigiImageCounter/5 == 1)
                this.image = this.leftImages[1];
            if(this.luigiImageCounter/5 == 2)
                this.image = this.leftImages[2];
            if(this.luigiImageCounter/5 == 3)
                this.image = this.leftImages[3];
            if(this.luigiImageCounter/5 == 4)
                this.image = this.leftImages[4];
            //restarts counter at 25
            this.luigiImageCounter %= 25;
        }
    }

    

    lazyLoad(){
        this.image1 = new Image();
        this.image2 = new Image();
        this.image3 = new Image();
        this.image4 = new Image();
        this.image5 = new Image();
        this.image1.src = "images/turtle.png";
        this.image2.src = "images/turtle.png";
        this.image3.src = "images/turtle.png";
        this.image4.src = "images/turtle.png";
        this.image5.src = "images/turtle.png";

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
        this.leftImage1.src = "images/turtle.png";
        this.leftImage2.src = "images/turtle.png";
        this.leftImage3.src = "images/turtle.png";
        this.leftImage4.src = "images/turtle.png";
        this.leftImage5.src = "images/turtle.png";

        this.leftImages.push(this.leftImage1);
        this.leftImages.push(this.leftImage2);
        this.leftImages.push(this.leftImage3);
        this.leftImages.push(this.leftImage4);
        this.leftImages.push(this.leftImage5);
    }

}
