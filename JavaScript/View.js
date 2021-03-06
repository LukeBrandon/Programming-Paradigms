class View{
    constructor(model)
    {
        this.model = model;
        this.canvas = document.getElementById("myCanvas");
    }

    update()
    {
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, 1300, 700);
        this.canvas.width = window.innerWidth;
        

        //drawBackground
        ctx.drawImage(this.model.backgroundImage, this.model.backgroundX -150, -33);
        
        //draw ground
        ctx.beginPath();
        ctx.strokeStyle="#518EFF";
        ctx.moveTo(-500,400);
        ctx.lineTo(1000,400);
        ctx.stroke();

        //draws all sprites
        for(let i = 0; i < this.model.sprites.length; i++)
        {
            this.model.sprites[i].draw(ctx);
        }
    }
}