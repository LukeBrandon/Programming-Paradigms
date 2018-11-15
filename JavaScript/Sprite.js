class Sprite{
	constructor(x, y, w, h, model){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.model = model;
		this.isCoinBlock = false;
		this.isBrick = false;
		this.isMario = false;
		this.isCoin = false;
		this.isGoomba = false;
	}

	oldPosition(){
        this.prevX = this.x;
        this.prevY = this.y;
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


}
