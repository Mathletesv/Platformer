export default class Rectangle {
    constructor(x, y, width, height, fillStyle = "black", death = false) {
        this.shape = "rect";
        this.coords = [x, y];
        this.dimen = [width, height];
        this.fillStyle = fillStyle;
		this.death = death;
    }
	update() {
		
	}
    draw(x, y, ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        ctx.rect(x + this.coords[0], y + this.coords[1], this.dimen[0], this.dimen[1]);
        ctx.fill();
		if (this.death) {
			ctx.beginPath();
			ctx.rect(x + this.coords[0], y + this.coords[1], this.dimen[0], this.dimen[1]);
			ctx.stroke();
		}
    }
}