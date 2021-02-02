export default class Player {
    constructor(spawn) {
        this.x = spawn[0];
        this.y = spawn[1];
        this.state = "circle";
        this.color = "green";
        this.xvel = 0;
        this.yvel = 0;
    }
    reset(spawn) {
        this.x = spawn[0];
        this.y = spawn[1];
        this.state = "circle";
        this.color = "green";
        this.xvel = 0;
        this.yvel = 0;
    }
    playerdraw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(800, 500, 15, 0, Math.PI * 2);
        ctx.fill();
    }
}