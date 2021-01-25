export default class Polygon {
    constructor(vertices, fillStyle) {
        this.shape = "polygon";
        this.f = fillStyle;
        this.v = vertices;
        this.yvel = 0;
        this.xvel = 0;
        this.edges = [];
        for (let i = 0; i < this.v.length - 1; i++) {
            this.edges.push([this.v[i + 1][0] - this.v[i][0],
                this.v[i + 1][1] - this.v[i][1]
            ]);
        }
        this.edges.push([this.v[this.v.length - 1][0] - this.v[0][0],
            this.v[this.v.length - 1][1] - this.v[0][1]
        ]);
    }
    draw(x, y, ctx) {
        ctx.beginPath();
        ctx.moveTo(this.v[0][0] + x, this.v[0][1] + y);
        for (let i = 1; i < this.v.length; i++) {
            ctx.lineTo(this.v[i][0] + x, this.v[i][1] + y);
        }
        ctx.lineTo(this.v[0][0] + x, this.v[0][1] + y);
        ctx.fillStyle = this.f;
        ctx.fill();
    }
}