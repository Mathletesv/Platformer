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
    collision(x, y, state) {
        if (state == "circle") return this.circlecollision(x, y);
        else if (state == "cube") return this.rectcollision(x, y);
    }
    circlecollision(x, y) {
        for (let shape of this.s) {
            if (shape.shape == "circle") {
                if (shape.radius + 15 >= Math.sqrt((shape.coords[0] - x - 15) ** 2 +
                	(shape.coords[1] - y - 15) ** 2)) {
						if (shape.death = true) {
							return 0;
						}
					return 1;
				}
            } else if (shape.shape == "rect") {
                let closex = x + 15;
                let closey = y + 15;
                if (x + 15 < shape.coords[0]) closex = shape.coords[0];
                else if (x + 15 > shape.coords[0] + shape.dimen[0]) closex = shape.coords[0] + shape.dimen[0];
                if (y + 15 < shape.coords[1]) closey = shape.coords[1];
                else if (y + 15 > shape.coords[1] + shape.dimen[1]) closey = shape.coords[1] + shape.dimen[1];

                if (Math.sqrt((x + 15 - closex) ** 2 + (y + 15 - closey) ** 2) <= 15) {
					if (shape.death) {
						return 0;
					}
					return 1;
				}
            }
        }
        return 2;
    }
    rectcollision(x, y) {
        for (let shape of this.s) {
            if (shape.shape == "circle") {
                let closex = shape.coords[0];
                let closey = shape.coords[1];
                if (shape.coords[0] < x) closex = x;
                else if (shape.coords[0] > x + 30) closex = x + 30;
                if (shape.coords[1] < y) closey = y;
                else if (shape.coords[1] > y + 30) closey = y + 30;

                if (Math.sqrt((shape.coords[0] - closex) ** 2 +
                (shape.coords[1] - closey) ** 2) <= shape.radius) {
					if (shape.death) {
						return 0;
					}
					return 1;
				}
            } else if (shape.shape == "rect") {
                if (shape.coords[0] + shape.dimen[0] > x && shape.coords[0] < x + 30 &&
                shape.coords[1] + shape.dimen[1] > y && shape.coords[1] < y + 30) {
					if (shape.death) {
						return 0;
					}
					return 1;
				}
            }
        }
        return 2;
    }
}