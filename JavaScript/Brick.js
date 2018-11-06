class Brick{
    constructor(x, y, w, h, model, update, draw){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.model = model;
        this.update = update;
        this.draw = draw;
        this.isCoinBlock = false;
        this.isCoin = false;
    }

    update(){
        //nothing needs to be updated
    }

    draw(ctx){
        ctx.strokeStyle="##18EFF";
        ctx.rect(this.x - this.model.screenPos, this.y, this.w, this.h);
        ctx.stroke();
    }

}