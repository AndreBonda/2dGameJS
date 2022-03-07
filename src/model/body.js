import {uuidv4} from '../util/util.js';

export class Body {
    constructor(x, y, radius, color) {
        this.id = uuidv4();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    getX = () => this.x;
    getY = () => this.y;

    draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }
}