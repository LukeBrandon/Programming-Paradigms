function Brick(x, y, w, h, model, update, draw){
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

Brick.prototype.update = function(){
    //nothing needs to be updated
}

Brick.prototype.draw = function(ctx){
    ctx.rect(this.x - this.model.screenPos, this.y, this.w, this.h);
    ctx.stroke();
}