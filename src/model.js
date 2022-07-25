import { ENEMY_VELOCITY, GameStatus, MS_ENEMY_SPAWN, PLAYER_COLOR, PLAYER_RADIUS, PROJECTILE_COLOR, PROJECTILE_RADIUS, Sides } from "./consts.js";
import { Enemy } from "./model/enemy.js";
import { Player } from "./model/player.js";
import { Projectile } from "./model/projectile.js";
import { Vector2D } from "./model/Vector2D.js";
import { randomColor, randomInt, randomIntRange, randomFloat } from "./util/util.js";

export class Model {
    constructor() {
        //Setting "logical" origin of the canvas
        this.Ox = innerWidth / 2;
        this.Oy = innerHeight / 2;
        this.initializeGame();
        this.stopGame();
        this.gameStatus = GameStatus.STOPPED;
        this.player = new Player(this.getO().Ox, this.getO().Oy, PLAYER_RADIUS, PLAYER_COLOR);
        this.enemyGenerator();
    }

    getO() {
        return {
            Ox: this.Ox,
            Oy: this.Oy
        }
    }

    getPlayer() {
        return this.player;
    }

    getEnemies() {
        return this.movingBodies;
    }

    removeEnemy(id) {
        this.movingBodies = this.movingBodies.filter(x => x.id !== id);
    }

    spawnChildrenEnemy(enemy) {
        if(enemy.radius > 25) {
            this.getEnemies().push(
                new Enemy(enemy.x, enemy.y - enemy.radius / 2, enemy.radius / 2, enemy.color, enemy.vector.v, enemy.vector.alpha + 0.30));

                this.getEnemies().push(
                    new Enemy(enemy.x + enemy.radius / 2, enemy.y + enemy.radius, enemy.radius / 2, enemy.color, enemy.vector.v, enemy.vector.alpha - 0.30));
        }
    }

    getProjectiles() {
        return this.projectiles;
    }

    addProjectile(clientX, clientY) {
        const p = new Projectile(clientX, clientY, PROJECTILE_RADIUS, PROJECTILE_COLOR, this.getO().Ox, this.getO().Oy);
        this.projectiles.push(p);
    }

    removeProjectile(id) {
        this.projectiles = this.projectiles.filter(x => x.id !== id);
    }

    increaseScore() {
        this.score += 1;
    }

    getScore() {
        return this.score;
    }

    // TODO: eliminare?
    getGameStatus() {
        return this.gameStatus;
    }

    isGameRunning() {
        return this.getGameStatus() === GameStatus.RUNNING;
    }

    toggleGameStatus() {
        if (this.isGameRunning())
            this.gameStatus = GameStatus.STOPPED;
        else
            this.gameStatus = GameStatus.RUNNING;
    }

    initializeGame() {
        this.movingBodies = [];
        this.projectiles = [];
        this.score = 0;
        // keeping this varaìiable to avoid double bounce calculation
        this.enemyBounceCalculated = new Set();
    }

    runGame() {
        this.gameStatus = GameStatus.RUNNING;
    }

    stopGame() {
        this.gameStatus = GameStatus.STOPPED;
    }

    /**
     * This method is called after every animation cycle resetting the balls that are calculated for collision
     */
    resetEnemyBounceCalculated() {
        this.enemyBounceCalculated = new Set();
    }

    /**
     * It avoids the occurrence of double collision calculation of a ball during the same animation cycle.
     * @param {string} id: ball's guid calculated
     * @returns 
     */
    addEnemyBounceCalculated(id) {
        return this.enemyBounceCalculated.add(id);
    }

    isBounceCalculated(id) {
        return this.enemyBounceCalculated.has(id);
    }

    enemyGenerator() {
        setInterval(() => {
            if (this.isGameRunning()) {
                const sideGeneration = randomInt(4);
                // coordinate e angolo di direzione per lo spawn del corpo
                let x = 0;
                let y = 0;
                let alpha = 0;

                switch (sideGeneration) {
                    case Sides.TOP:
                        x = randomInt(innerWidth);
                        y = 0;
                        // quando spawna in top side l'angolo dovrà essere compreso tra 0 e -π 
                        alpha = randomFloat(-Math.PI);
                        break;
                    case Sides.RIGHT:
                        x = innerWidth;
                        y = randomInt(innerHeight);
                        // quando spawna in right side l'angolo dovrà essere compreso tra π/2 e 3π/2
                        alpha = randomFloat(Math.PI) + Math.PI / 2;
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
                        // quando spawna in left side l'angolo dovrà essere compreso tra π/2 e -π/2 
                        alpha = randomFloat(Math.PI) - (Math.PI / 2);
                        break;
                }

                let randomRadius = randomIntRange(10, 40);
                const newEnemy = new Enemy(x, y, randomRadius, randomColor(), ENEMY_VELOCITY, alpha);

                // if new element collides with another one, it will skip the generation                
                if (!this.getEnemies().some(e => newEnemy.collision(e)))
                    this.getEnemies().push(newEnemy);
            }
        }, MS_ENEMY_SPAWN);
    }

    /**
     * Collision handler between two balls.
     * Algorithm used: https://drive.google.com/file/d/15TYPgM5kzLBmrZUoi3hJDEWB8lAw0LEE/view?usp=sharing
     * @param {Enemy} b1 
     * @param {Enemy} b2 
     */
    collision(b1, b2) {
        if (!this.isBounceCalculated(b1.id)) {
            this.addEnemyBounceCalculated(b1.id);
            this.addEnemyBounceCalculated(b2.id);

            // normal vector
            const normal = Vector2D.FromComponents(b1.x - b2.x, b2.y - b1.y);

            // unit normal vector
            const unitnormal = normal.multiply(1 / normal.v);

            // unit tangent vector
            const unittangent = Vector2D.FromComponents(-unitnormal.vy, unitnormal.vx);

            // Project velocities onto the unit normal and unit tangent vectors
            const v1n = Vector2D.dot(unitnormal, b1.vector);
            const v1t = Vector2D.dot(unittangent, b1.vector);
            const v2n = Vector2D.dot(unitnormal, b2.vector);
            const v2t = Vector2D.dot(unittangent, b2.vector);

            //tangential velocities don't change
            //normal velocities after collision
            let v1nAfter = v2n;
            let v2nAfter = v1n;

            // Convert normal and tangential scalar into vectors
            v1nAfter = unitnormal.multiply(v1nAfter);
            const v1tAfter = unittangent.multiply(v1t);
            v2nAfter = unitnormal.multiply(v2nAfter);
            const v2tAfter = unittangent.multiply(v2t);

            // update velocities
            b1.vector = v1nAfter.add(v1tAfter);
            b2.vector = v2nAfter.add(v2tAfter);
        }
    }
}