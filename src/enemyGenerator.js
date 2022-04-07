import { randomInt, randomFloat, randomIntRange } from './util/util.js';
import { Enemy } from "./model/enemy.js";
import { Sides, getEnemies,GameStatus, getGameStatus } from "./global.js";
import { MS_ENEMY_SPAWN } from './consts.js';

/**
 * Funzione che ad ogni delta di tempo, seleziona in modo random un lato del canvas e spawna un enemy
 * con un angolo alpha (direzione) all'interno del canvas.*/
export function enemyGenerator() {
    setInterval(function () {
        if(getGameStatus() === GameStatus.RUNNING) {
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
    
        let randomMass = randomIntRange(10, 40);
        const newEnemy = new Enemy(x, y, randomMass, 'green', 300, alpha);

        // if new element collides with another one, it will skip the generation
        if (!getEnemies().some(e => newEnemy.collision(e)))
            getEnemies().push(newEnemy);

            console.log(randomIntRange(0, innerWidth));
            console.log(randomInt(4));
        }
    }, MS_ENEMY_SPAWN);
}