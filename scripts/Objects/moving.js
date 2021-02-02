export default class Moving {
    constructor(path, order, shape) {
        this.body = shape;
        this.shape = shape.shape;
        this.path = path;
        this.order = order;
        this.current = order[0];
        this.coords = [path[order[0]].pos.x, path[order[0]].pos.y];
        this.xyspeeds();
        if (this.shape == "circle") {
            this.radius = this.body.radius;
        } else if (this.shape == "rect") {
            this.dimen = this.body.dimen;
        }
        this.death = this.body.death;
    }
    update(time) {
        if (this.distance < this.speed * time) {
            this.body.coords[0] += this.speeds.x * this.distance;
            this.body.coords[1] += this.speeds.y * this.distance;
            this.distance -= this.distance;
            //this.update(this.distance / this.speed);
            time -= this.distance / this.speed;
            this.current++;
            if (this.current == this.order.length) {
                this.current = 0;
            }
            this.xyspeeds();
            this.update(time);
        } else {
            this.body.coords[0] += this.speeds.x * time * this.speed;
            this.body.coords[1] += this.speeds.y * time * this.speed;
            this.distance -= this.speed * time;
        }
        this.coords = this.body.coords;
    }
    xyspeeds() {
        let next;
        this.speed = this.path[this.order[this.current]].speed;
        next = this.current + 1;
        if (next == this.path.length) {
            next = 0;
        }
        let xdiff = this.path[this.order[next]].pos.x - this.path[this.order[this.current]].pos.x;
        let ydiff = this.path[this.order[next]].pos.y - this.path[this.order[this.current]].pos.y;
        this.distance = Math.sqrt(xdiff ** 2 + ydiff ** 2);
        this.speeds = {
            "x": xdiff / this.distance,
            "y": ydiff / this.distance
        };
        //console.log("xyspeeds", this.speeds, this.distance, this.current);
    }
    draw(x, y, ctx) {
        this.body.draw(x, y, ctx);
    }
    collision(x, y) {
        return this.body.collision(x, y);
    }
}