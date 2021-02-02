import Player from './player.js';
import Map from './map.js';
import { levelData } from './levels.js';
import Keys from './utility/keys.js';

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
ctx.lineWidth = 2;
const speed = 200;
let map = new Map(levelData);
let player = new Player(map.spawn);
let keys = new Keys();
let delta = 0;
let accumulator = 0;
const timestep = 1 / 60;
let time = new Date().getTime();
let collision;

function scaler() {
    const winw = window.innerWidth;
    const winh = window.innerHeight;
    const xvalue = winw / canvas.width;
    const yvalue = winh / canvas.height;
    const scale = Math.min(xvalue, yvalue);
    canvas.style.transform = 'scale(' + scale + ')';
    canvas.style.left = (winw - canvas.width) / 2 + 'px';
    canvas.style.top = (winh - canvas.height) / 2 + 'px';
}

scaler();
window.onresize = scaler;

function update() {
    delta = new Date().getTime() - time + accumulator;
    accumulator = 0;
    time = new Date().getTime();
    while (delta > 1000 * timestep) {
        map.update(timestep);
        playerupdate(timestep);
        delta -= 1000 * timestep;
    }
    accumulator = delta;
    ctx.clearRect(0, 0, 1600, 900);
    map.draw(-player.x + 800 - 15, -player.y + 500 - 15, ctx);
    player.playerdraw(ctx);
    requestAnimationFrame(update);
}

function playerupdate(delta) {
    player.yvel += 500 * delta;
    player.xvel = keys.vel(speed);
    player.x += player.xvel * delta;
    player.y += player.yvel * delta;
    collision = map.collision(player.x + 15, player.y + 15);
    if (collision == true) {
        player.reset(map.spawn);
        keys = new Keys();
    } else {
        //console.log(collision);
        player.x -= collision[0];
        if (collision[1] != 0) {
            player.y -= collision[1];
            player.yvel = 0;
        }
    }
}

requestAnimationFrame(update);

document.onkeydown = function(e) {
    switch (e.code) {
        case "ArrowUp":
            collision = map.collision(player.x + 15, player.y + 15.1);
            if (collision[1] != 0) {
                player.yvel = -400;
            }
            break;
        case "ArrowRight":
            keys.keys["right"] = true;
            break;
        case "ArrowLeft":
            keys.keys["left"] = true;
            break;
        case "KeyW":
            collision = map.collision(player.x + 15, player.y + 15.1);
            if (collision[1] != 0) {
                player.yvel = -400;
            }
            break;
        case "KeyD":
            keys.keys["right"] = true;
            break;
        case "KeyA":
            keys.keys["left"] = true;
            break;
        case "KeyR":
            player.reset(map.spawn);
        case "KeyL":
            console.log(player.x, player.y);
    }
}
document.onkeyup = function(e) {
    if (e.code == "ArrowRight" || e.code == "KeyD") {
        keys.keys["right"] = false;
    } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        keys.keys["left"] = false;
    }
}