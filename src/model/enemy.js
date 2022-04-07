import { addEnemyBounceCalculated, isBounceCalculated } from "../global.js";
import { MovingBody } from "./movingBody.js";
import { Vector2D } from "./Vector2D.js";

export class Enemy extends MovingBody {
    constructor(x, y, massRadius, color, v, alpha) {
        super(x, y, massRadius, color, null, null, v, alpha);
    }
}