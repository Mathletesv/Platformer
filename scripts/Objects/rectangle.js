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
    collision(x, y) {
        if (x + 15 < this.coords[0] || x - 15 > this.coords[0] + this.dimen[0] ||
            y + 15 < this.coords[1] || y - 15 > this.coords[1] + this.dimen[1]) return [0, 0];
        if (this.death) return true;
        let sides = {};
        sides[Math.abs((x + 15) - this.coords[0])] = "left";
        sides[Math.abs(this.coords[0] + this.dimen[0] - (x - 15))] = "right";
        sides[Math.abs((y + 15) - this.coords[1])] = "top";
        sides[Math.abs(this.coords[1] + this.dimen[1] - (y - 15))] = "bottom";
        let closest = sides[Math.min(...Object.keys(sides))];
        let arr = [0, 0];
        switch (closest) {
            case "left":
                arr[0] = Math.max(0, x + 15 - this.coords[0]);
                break;
            case "right":
                arr[0] = Math.min(0, x - 15 - this.coords[0] - this.dimen[0]);
                break;
            case "top":
                arr[1] = Math.max(0, y + 15 - this.coords[1]);
                break;
            case "bottom":
                arr[1] = Math.min(0, y - 15 - this.coords[1] - this.dimen[1]);
                break;
        }
        //console.log(arr);
        return arr;
    }
}