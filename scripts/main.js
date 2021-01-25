import Player from './player.js';
import Map from './map.js';
import { levelData } from './levels.js';

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
ctx.lineWidth = 2;
let map = new Map(levelData);
let player = new Player(map.spawn);
let delta = 0;
let time = new Date().getTime();

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
	delta = new Date().getTime() - time;
	time = new Date().getTime();
    ctx.clearRect(0, 0, 1600, 900);
    map.draw(-player.x + 800 - 15, -player.y + 500 - 15, ctx);
	map.update(delta / 1000);
    playerupdate(delta);
    requestAnimationFrame(update);
}

function playerupdate(delta) {
    player.yvel += 9.8 * delta / 1000;
    player.x += player.xvel;
	let collision = map.collision(player.x, player.y, player.state);
    if (collision == 0) {
		player.reset(map.spawn);
    }
	else if (collision == 1) {
		player.x -= player.xvel;
	}
    player.y += player.yvel;
    collision = map.collision(player.x, player.y, player.state);
	if (collision == 0) {
		player.reset(map.spawn);
    }
	else if (collision == 1) {
		player.y -= player.yvel;
		player.yvel = 0;
	}
    player.playerdraw(ctx);
}

requestAnimationFrame(update);

let rightleft = [0, 0];

document.onkeydown = function(e) {
    switch (e.code) {
        case "ArrowUp":
            if (map.collision(player.x, player.y + 1, player.state) == 1) {
                player.yvel = -7.5;
            }
            break;
        case "ArrowRight":
            player.xvel = 3;
            break;
        case "ArrowLeft":
            player.xvel = -3;
            break;
        case "KeyJ":
            if (!player.statelock) {
                player.state = player.state == "cube" ? "circle" : "cube";
            }
            break;
		case "KeyW":
            if (map.collision(player.x, player.y + 1, player.state) == 1) {
                player.yvel = -7.5;
            }
            break;
		case "KeyD":
            player.xvel = 3;
            break;
		case "KeyA":
		    player.xvel = -3;
            break;
        case "KeyZ":
            if (!player.statelock) {
                player.state = player.state == "cube" ? "circle" : "cube";
            }
            break;
		case "KeyR":
			player.reset(map.spawn);
    }
}
document.onkeyup = function(e) {
    switch (e.code) {
        case "ArrowRight":
            player.xvel = (player.xvel == 3 ? 0 : -3);
            break;
        case "ArrowLeft":
            player.xvel = (player.xvel == -3 ? 0 : 3);
            break;
		case "KeyD":
            player.xvel = (player.xvel == 3 ? 0 : -3);
            break;
		case "KeyA":
		    player.xvel = (player.xvel == -3 ? 0 : 3);
            break;
    }
}