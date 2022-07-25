import { PROJECTILE_COLOR } from "./consts.js";

export class View {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        // getting the context
        this.c = this.canvas.getContext('2d');
    }

    refreshCanvas(score) {
        this.clearCanvas();
        this.renderScore(score);
    }

    /**
     * Clear all rendered items in canvas
     */
    clearCanvas() {
        this.c.clearRect(0, 0, innerWidth, innerHeight);
    }

    renderScore(score) {
        this.c.beginPath();
        this.c.font = "30px Arial";
        this.c.fillStyle = 'lightblue';
        this.c.fillText(`Score ${score}`, 10, 50);
    }

    /**
     * Body rendering
     * @param {CanvasRenderingContext2D} c. Rendering context for the drawing surface
     */
    renderBody(b) {
        this.c.beginPath();
        this.c.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        this.c.fillStyle = b.color;
        this.c.fill();
    }

    /**
     * Overriding body rendering
     * @param {CanvasRenderingContext2D} c. Rendering context for the drawing surface
     */
    renderProjectile(p) {
        this.renderBody(p);

        const lastPos = p.trail.getOldestPosition();
        
        if(lastPos) {
            this.c.beginPath();
            this.c.strokeStyle = PROJECTILE_COLOR;
            this.c.lineWidth = 1;
            this.c.moveTo(this.x, this.y);
            this.c.lineTo(lastPos.x, lastPos.y);
            this.c.stroke();
        }
    }
}