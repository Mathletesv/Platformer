import EnemyRunner from './enemies/enemies.js';

export default class Map {
    constructor(leveldata) {
        this.level = 0;
        this.spawn = leveldata[0]["spawn"];
        this.s = leveldata[0]["shapes"];
        this.e = leveldata[0]["enemies"];
        this.p = leveldata[0]["powerups"];
        this.endy = leveldata[0]["finish"];
    }
    draw(x, y, ctx) {
        for (let shape of this.s) {
            shape.draw(x, y, ctx);
        }
    }
    update(delta) {
        for (let shape of this.s) {
            shape.update(delta);
        }
    }
    collision(x, y, axis) {
        let final = [0, 0];
        for (let shape of this.s) {
            let col = shape.collision(x, y, axis);
            if (col == true) return true;
            else {
                final[0] += col[0];
                final[1] += col[1];
            }
        }
        return final;
    }
}