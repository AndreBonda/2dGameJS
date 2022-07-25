import { MS_ENEMY_SPAWN, OFFSET_LIMIT_CANVAS } from "./consts.js";
import { randomInt, randomIntRange } from "./util/util.js";

export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        const player = this.model.getPlayer();
        this.view.renderBody(player);
        this.addEventListeners();
    }

    animate() {
        if (this.model.isGameRunning()) {
            this.view.refreshCanvas(this.model.getScore());
            const player = this.model.getPlayer();
            this.view.renderBody(player);

            this.model.getEnemies().forEach(b => {
                b.update();

                if (b.collision(player))
                    this.loseGame();

                // remove items outside the canvas
                if (b.x < 0 || b.x > innerWidth || b.y < 0 || b.y > innerHeight)
                    this.model.removeEnemy(b.id);

                this.model.getEnemies().forEach(otherEnemy => {
                    if (b.id !== otherEnemy.id && b.collision(otherEnemy))
                        this.model.collision(b, otherEnemy);
                });

                this.model.resetEnemyBounceCalculated();
                this.view.renderBody(b);
            });

            this.model.getProjectiles().forEach(p => {
                p.update();

                // remove projectiles outside the canvas. O(N^2)
                if (p.x < 0 - OFFSET_LIMIT_CANVAS || p.x > innerWidth + OFFSET_LIMIT_CANVAS || p.y < 0 - OFFSET_LIMIT_CANVAS || p.y > innerHeight + OFFSET_LIMIT_CANVAS)
                    this.model.removeProjectile(p.id);

                // collision between enemies and projectiles
                this.model.getEnemies().forEach(enemy => {
                    if (p.collision(enemy)) {
                        this.model.spawnChildrenEnemy(enemy);
                        this.model.removeEnemy(enemy.id);
                        this.model.removeProjectile(p.id);
                        this.model.increaseScore();
                    }
                });

                this.view.renderProjectile(p);
            });
        }
    }

    /**
     * Events
     */

    togglePlayPause() {
        this.model.toggleGameStatus();

        if (this.model.isGameRunning()) {
            document.getElementById("play").innerText = 'Pause';
            document.getElementById("scoreModal").style.display = 'none';
        }
        else {
            document.getElementById("play").innerText = 'Play';
        }
    }

    playAgain() {
        this.model.runGame();
        this.model.initializeGame();
        document.getElementById("scoreModal").style.display = 'none';
    }

    loseGame() {
        this.model.stopGame();
        document.getElementById("scoreModal").style.display = 'block';
        document.getElementById("finalScore").innerText = this.model.getScore();
    }

    addEventListeners() {
        document.getElementById("play").addEventListener('click', e => {
            this.togglePlayPause();
        });

        document.getElementById("play-again").addEventListener('click',e => {
            this.playAgain();
        });

        this.view.canvas.addEventListener('click', e => {
            if(this.model.isGameRunning()) {
                this.model.addProjectile(e.clientX, e.clientY);
            }
        });
    }
}