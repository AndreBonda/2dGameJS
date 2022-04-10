import { PROJECTILE_TRAIL_NUMBER } from "../consts.js";
import { Queue } from "../data-structure/queue.js";

export class Trail {

    constructor() {
        this.positions = new Queue(PROJECTILE_TRAIL_NUMBER);
    }

    addLastPosition(x, y) {
        if (this.positions.isFull())
            this.positions.dequeue();

        this.positions.enqueue({ x: x, y: y });
    }

    getOldestPosition() {
        return this.positions.peek();
    }
}