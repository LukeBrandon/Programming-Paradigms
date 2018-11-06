class Controller{
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.key_right = false;
        this.key_left = false;
        let self = this;
        //view.canvas.addEventListener("click", function(event) { self.onClick(event); });
        document.addEventListener('keydown', function(event) { self.keyDown(event); }, false);
        document.addEventListener('keyup', function(event) { self.keyUp(event); }, false);
        // document.addEventListener('mousedown', function(event) {self.mouseDown(event); }, false);
        // document.addEventListener('mouseup', function(event) {self.mouseUp(event); }, false);
        document.addEventListener('contextmenu', function(event) {self.rightClick(event); }, false);

    }

    keyDown(event){
        if(event.keyCode == 39) this.key_right = true;
        else if(event.keyCode == 37) this.key_left = true;
        else if(event.keyCode == 32) this.key_space = true;
    }

    keyUp(event){
        if(event.keyCode == 39) this.key_right = false;
        else if(event.keyCode == 37) this.key_left = false;
        else if(event.keyCode == 32) this.key_space = false;
    }

    rightClick(event){
        console.log("place coin block");
        console.log(this.view.canvas.offsetLeft);
        let tempx = event.pageX - this.view.canvas.offsetLeft + this.model.screenPos;
        let tempy = event.pageY - this.view.canvas.offsetTop;
        let coinblock = new CoinBlock(tempx, tempy, this.model, CoinBlock.prototype.update, CoinBlock.prototype.draw);
        this.model.sprites.push(coinblock);
    }

    update(){
        this.model.mario.oldPosition();

        //does movement for mario
        if(this.key_right) {
            this.model.mario.x += 10; 
            this.model.mario.animate("right");
        }
        if(this.key_left){
            this.model.mario.x -=10; 
            this.model.mario.animate("left");
        }
        if(this.key_space && this.model.mario.lastTouchCounter < 10) this.model.mario.vertVel = -17.0;


    }

}

    


