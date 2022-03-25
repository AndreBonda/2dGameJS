import { MovingBody } from "./movingBody.js";

export class Enemy extends MovingBody {
    constructor(x, y, radius, color, v, alpha) {
        super(x, y, radius, color, null, null, v, alpha);
    }
}