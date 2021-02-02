export default class Keys {
    constructor() {
        this.keys = {
            "left": false,
            "right": false
        };
    }
    vel(speed) {
        return (this.keys["right"] - this.keys["left"]) * speed
    }
}