export default class Circle {
    constructor(x, y, radius, fillStyle = "red", death = true) {
        this.shape = "circle";
        this.coords = [x, y];
        this.radius = radius;
        this.fillStyle = fillStyle;
		this.death = true; // collision resolution with circles not yet implemented
    }
	update() {
		
	}
    draw(x, y, ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        ctx.arc(this.coords[0] + x, this.coords[1] + y, this.radius, 0, Math.PI * 2);
        ctx.fill();
		if (this.death) {
			ctx.beginPath();
			ctx.arc(this.coords[0] + x, this.coords[1] + y, this.radius, 0, Math.PI * 2);
			ctx.stroke();
		}
    }
}