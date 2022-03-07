import { Player } from "./model/player.js";
import { Projectile } from "./model/projectile.js";
import { Enemy } from "./model/enemy.js";
import { getO, setO, getBodies, removeBody, Sides } from "./global.js";
import { randomInt, randomFloat } from './util/util.js'

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
//ottengo il contesto
const c = canvas.getContext('2d');

setO(innerWidth / 2, innerHeight / 2);

const player = new Player(getO().Ox, getO().Oy, 20, 'red');
player.draw(c);

canvas.addEventListener('click', e => {
    const p = new Projectile(e.clientX, e.clientY, 8, 'blue');
    p.draw(c);
    getBodies().push(p);
});

animate();

setInterval(function () {
    const sideGeneration = randomInt(4);
    // coordinate di spawn del corpo
    let x = 0;
    let y = 0;
    let alpha = 0;

    switch (sideGeneration) {
        case Sides.TOP:
            x = randomInt(innerWidth);
            y = 0;
            // quando spawna in bottom side l'angolo dovrà essere compreso tra 0 e -π 
            alpha = randomFloat(-Math.PI);
            break;
        case Sides.RIGHT:
            x = innerWidth;
            y = randomInt(innerHeight);
            alpha = randomFloat(Math.PI * 1.5) + Math.PI / 2;
            break;
        case Sides.BOTTOM:
            x = randomInt(innerWidth);
            y = innerHeight;
            // quando spawna in bottom side l'angolo dovrà essere compreso tra 0 e π 
            alpha = randomFloat(Math.PI);
            break;
        case Sides.LEFT:
            x = 0;
            y = randomInt(innerHeight);
            alpha = randomFloat(Math.PI) - (Math.PI / 2);
            break;
    }

    const enemy = new Enemy(x, y, alpha, 300, 20, 'green');
    getBodies().push(enemy);

}, 500);

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);

    player.draw(c);

    getBodies().forEach(b => {
        b.update();

        // remove item if they are outside the canvas. O(N^2)
        if (b.getX() < 0 || b.getX() > innerWidth || b.getY() < 0 || b.getY() > innerHeight)
            removeBody(b.id);

        b.draw(c);
    });

    requestAnimationFrame(animate);
}