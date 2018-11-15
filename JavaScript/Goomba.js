class Goomba extends Sprite{
    constructor(x, y, model){
        super(x, y, 70, 55, model);
        this.prevX = 0;
        this.prevY = 0;
        this.horVel = 6;
        this.vertVel = 0.0;

        this.image = new Image();
        this.image.src = "images/turtle.png";

        this.isGoomba = true;
    }

    update(){
        //gravity 
        this.vertVel += 2.0;
        this.y += this.vertVel;

        //interacting with other sprites
        for(let i = 0; i < this.model.sprites.length; i++){
            let thatSprite = this.model.sprites[i]; //current sprite in for loop

            //checks if colliding and coin block colliding
            if(thatSprite != this && this.collides(thatSprite)) {    
                let dir = this.pushOut(thatSprite);

                //bouncing off the walls
                if(dir == "right" || dir == "left"){
                    this.horVel*=-1;
                }

                // if(thatSprite.isMario && dir == "bottom"){
                //     console.log("goomba dying");   
                //     this.model.sprites.splice(i,1);     
                // }

            }
        }//end iterating sprites

        //moving goomba and setting old position for collision
        this.oldPosition();
        this.x += this.horVel;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x - this.model.screenPos, this.y);
    } 

}