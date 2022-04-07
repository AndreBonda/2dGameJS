import { Player } from "./model/player.js";
import { Projectile } from "./model/projectile.js";
import { getO, setO, getEnemies, removeEnemy, getProjectiles, removeProjectile, projectileRadius, playerRadius, increaseScore, getScore,togglePlayPause, GameStatus, getGameStatus, resetEnemyBounceCalculated } from "./global.js";
import { enemyGenerator } from "./enemyGenerator.js";
import { Enemy } from "./model/enemy.js";
import { collision } from "./handleCollision.js";

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
// getting the context
const c = canvas.getContext('2d');

setO(innerWidth / 2, innerHeight / 2);

const player = new Player(getO().Ox, getO().Oy, playerRadius, 'red');
player.draw(c);

function animate() {
    if(getGameStatus() === GameStatus.RUNNING) {
        c.clearRect(0, 0, innerWidth, innerHeight);

        c.beginPath();
        c.font = "30px Arial";
        c.fillStyle = 'lightblue';
        c.fillText(`Score ${getScore()}`, 10, 50);
    
        player.draw(c);
    
        getEnemies().forEach(b => {
            b.update();
    
            // remove items outside the canvas. O(N^2)
            if (b.x < 0 || b.x > innerWidth || b.y < 0 || b.y > innerHeight)
                removeEnemy(b.id);

            // collision between enemies detection
            getEnemies().forEach(otherEnemy => {
                if(b.id !== otherEnemy.id && b.collision(otherEnemy)) {
                    collision(b, otherEnemy);
                }
            });

            resetEnemyBounceCalculated();
            b.draw(c);
        });
    
        getProjectiles().forEach(p => {
            p.update();
    
            // remove projectiles outside the canvas. O(N^2)
            if (p.x < 0 || p.x > innerWidth || p.y < 0 || p.y > innerHeight)
            removeProjectile(p.id);
    
            // collision between enemies and projectiles
            getEnemies().forEach(enemy => {
                if(p.collision(enemy)) {
                    removeEnemy(enemy.id);
                    removeProjectile(p.id);
                    increaseScore();
                }
            });
    
            p.draw(c);
        });
    }

    requestAnimationFrame(animate);
}

animate();
enemyGenerator();

// DOM elements
canvas.addEventListener('click', e => {
    if(getGameStatus() === GameStatus.RUNNING) {
        const p = new Projectile(e.clientX, e.clientY, projectileRadius, 'blue');
        p.draw(c);
        getProjectiles().push(p);
    }
});

document.getElementById("playBtn").addEventListener('click', e => {
    togglePlayPause();
});