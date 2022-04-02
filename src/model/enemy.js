import { addEnemyBounceCalculated, isBounceCalculated } from "../global.js";
import { MovingBody } from "./movingBody.js";
import { Vector2D } from "./Vector2D.js";

export class Enemy extends MovingBody {
    constructor(x, y, radius, color, v, alpha) {
        super(x, y, radius, color, null, null, v, alpha);
    }

    handleCollision(other) {
        if (!isBounceCalculated(this.id)) {
            addEnemyBounceCalculated(this.id);
            addEnemyBounceCalculated(other.id);
            console.log(`A: vx = ${this.vector.vx}, vy = ${this.vector.vy}, v = ${this.vector.v}, alpha = ${this.vector.alpha}`);
            console.log(`B: vx = ${other.vector.vx}, vy = ${other.vector.vy}, v = ${other.vector.v}, alpha = ${other.vector.alpha}`);

            const oneDim = false;

            if (oneDim) {
                // 1d collision (no mass)
                const vx1After = other.vector.vx;
                const vx2After = this.vector.vx;
                this.vector.update(vx1After, this.vector.vy);
                other.vector.update(vx2After, other.vector.vy);
            } else {
                // 2d collistion (no mass)

                // 1 - compute the angle
                const diffX = this.x - other.x;
                const diffY = this.y - other.y;
                const angle = Math.atan2(diffY, diffX);
                console.log(angle);
                debugger;
            }


            console.log(`A: vx = ${this.vector.vx}, vy = ${this.vector.vy}, v = ${this.vector.v}, alpha = ${this.vector.alpha}`);
            console.log(`B: vx = ${other.vector.vx}, vy = ${other.vector.vy}, v = ${other.vector.v}, alpha = ${other.vector.alpha}`);
        }
    }
}