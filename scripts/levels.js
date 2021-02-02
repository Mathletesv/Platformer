import Circle from './Objects/circle.js';
import Rectangle from './Objects/rectangle.js';
import Moving from './Objects/moving.js';

export let levelData = [{
    "name": "Tutorial",
    "shapes": [
        new Rectangle(50, 50, 10, 20, "green", false),
        new Rectangle(0, 250, 100, 10, "green", true),
        new Moving([{
                "pos": {
                    "x": 25,
                    "y": 50
                },
                "speed": 45
            },
            {
                "pos": {
                    "x": 500,
                    "y": 50
                },
                "speed": 60
            },
            {
                "pos": {
                    "x": 500,
                    "y": 300
                },
                "speed": 50
            },
            {
                "pos": {
                    "x": 25,
                    "y": 300
                },
                "speed": 100
            }
        ], [0, 1, 2, 3], new Rectangle(25, 50, 100, 25, "blue", true)),
        new Rectangle(0, 350, 500, 500, "orange", false)
        /*new Polygon([
            [50, 50],
            [200, 70],
            [400, 120],
            [300, 190],
            [100, 230],
            [30, 100]
        ], "red")*/
    ],
    "powerups": {},
    "enemies": {},
    "finish": 1000,
    "spawn": [250, 250]
}];