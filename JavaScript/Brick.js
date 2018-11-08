class Brick extends Sprite{
    constructor(x, y, w, h, model){
        super(x, y, w, h, model);
        this.model = model;
        this.isBrick = true;
    }

    isBrick(){
        return true;
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