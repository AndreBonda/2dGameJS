import { randomInt, randomFloat } from './util/util.js';
import { Enemy } from "./model/enemy.js";
import { Sides, getEnemies, msEnemySpawn } from "./global.js";

/**
 * Funzione che ad ogni delta di tempo, seleziona in modo random un lato del canvas e spawna un enemy
 * con un angolo alpha (direzione) all'interno del canvas.*/
export function enemyGenerator() {
    setInterval(function () {
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
                // quando spawna in left side l'angolo dovrà essere compreso tra π/2 e -π/2 
                alpha = randomFloat(Math.PI) - (Math.PI / 2);
                break;
        }
    
        const enemy = new Enemy(x, y, alpha, 300, 20, 'green');
        getEnemies().push(enemy);
    
    }, msEnemySpawn);
}