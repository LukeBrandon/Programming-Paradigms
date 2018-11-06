function Brick(x, y, w, h, model, update, draw){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.model = model;
    this.update = update;
    this.draw = draw;
}

Brick.prototype.update = function(){


}

Brick.prototype.draw = function(ctx){
    ctx.rect(this.x - this.model.screenPos, this.y, this.w, this.h);
    ctx.stroke();
}