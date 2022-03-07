import { Player } from "./model/player.js";
import { Projectile } from "./model/projectile.js";
import { getO, setO, getEnemies, removeEnemy, getProjectiles, removeProjectile, projectileRadius, playerRadius } from "./global.js";
import { enemyGenerator } from "./enemyGenerator.js";

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
//ottengo il contesto
const c = canvas.getContext('2d');

setO(innerWidth / 2, innerHeight / 2);

const player = new Player(getO().Ox, getO().Oy, playerRadius, 'red');
player.draw(c);

canvas.addEventListener('click', e => {
    const p = new Projectile(e.clientX, e.clientY, projectileRadius, 'blue');
    p.draw(c);
    getProjectiles().push(p);
});

animate();
enemyGenerator();

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);

    player.draw(c);

    getEnemies().forEach(b => {
        b.update();

        // remove items outside the canvas. O(N^2)
        if (b.getX() < 0 || b.getX() > innerWidth || b.getY() < 0 || b.getY() > innerHeight)
            removeEnemy(b.id);

        b.draw(c);
    });

    getProjectiles().forEach(p => {
        p.update();

        // remove projectiles outside the canvas. O(N^2)
        if (p.getX() < 0 || p.getX() > innerWidth || p.getY() < 0 || p.getY() > innerHeight)
        removeProjectile(p.id);

        getEnemies().forEach(enemy => {
            if(p.collision(enemy)) {
                removeEnemy(enemy.id);
                removeProjectile(p.id);
            }
        });

        p.draw(c);
    });

    requestAnimationFrame(animate);
}