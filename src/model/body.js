import {uuidv4} from '../util/util.js';

export class Body {
    constructor(x, y, radius, color) {
        this.id = uuidv4();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    /**
     * Body rendering
     * @param {CanvasRenderingContext2D} c. Rendering context for the drawing surface
     */
    draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }

    // Calcola la distanza da un altro body
    distanceTo(b) {
        const diffx = this.x - b.x;
        const diffy = this.y - b.y;
        return Math.sqrt(Math.pow(diffx, 2) + Math.pow(diffy, 2));
    }

    // Controlla se è presente una collisione tra bodies. La collisione è presente se la loro distanza
    // è minore della somma dei raggi.
    collision(b) {
        const distance = this.distanceTo(b);
        return distance <= this.radius + b.radius;
    }
}