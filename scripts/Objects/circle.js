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
    collision(x, y) {
        let distance = Math.sqrt((x - this.coords[0]) ** 2 + (y - this.coords[1]) ** 2);
        if (distance >= 15 + this.radius) {
            return [0, 0];
        } else {
            if (this.death) return true;
            let arr = [0, 0];
            let ratio = (distance - 15 - this.radius) / distance;
            if (x != this.coords[0]) {
                arr[0] = ratio * (x - this.coords[0]);
            } else if (y != this.coords[1]) {
                arr[1] = ratio * (y - this.coords[1]);
            }
            return arr;
        }
    }
}