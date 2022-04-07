import { addEnemyBounceCalculated, getEnemies, isBounceCalculated } from "../global.js";
import { MovingBody } from "./movingBody.js";
import { Vector2D } from "./Vector2D.js";

export class Enemy extends MovingBody {
    constructor(x, y, radius, color, v, alpha) {
        super(x, y, radius, color, null, null, v, alpha);
    }

    spawnChildren() {
        if(this.radius > 25) {
            getEnemies().push(new Enemy(this.x, this.y - this.radius / 2, this.radius / 2, this.color, this.vector.v, this.vector.alpha + 0.30));
            getEnemies().push(new Enemy(this.x + this.radius / 2, this.y + this.radius, this.radius / 2, this.color, this.vector.v, this.vector.alpha - 0.30));
        }
    }
}