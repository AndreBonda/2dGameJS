import { MovingBody } from "./movingBody.js";

export class Enemy extends MovingBody {
    constructor(x, y, alpha, velocity, radius, color) {
        super(x, y, radius, color);
        this.alpha = alpha;
        this.velocity = velocity;
    }
}