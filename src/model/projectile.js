import { MIN_PROJECTILE_VELOCITY, PROJECTILE_COLOR } from "../consts.js";
import { getO } from "../global.js";
import { MovingBody } from "./movingBody.js";
import { Trail } from "./trail.js";

export class Projectile extends MovingBody {

    constructor(clickX, clickY, radius, color) {
        // Projectiles start from the center
        const vx = clickX - getO().Ox;
        const vy = getO().Oy - clickY;
        super(getO().Ox, getO().Oy, radius, color, vx, vy, null, null);
        this.trail = new Trail();
    }

    /**
     * Overriding moving body update for projectiles.
     */
    update = function() {
        this.trail.addLastPosition(this.x, this.y);

        let updateVelocity = this.vector.v;

        if(updateVelocity < MIN_PROJECTILE_VELOCITY)
            updateVelocity = MIN_PROJECTILE_VELOCITY;

        this.x += Math.cos(this.vector.alpha) * updateVelocity / 50;
        this.y -= Math.sin(this.vector.alpha) * updateVelocity / 50;
    }

        /**
     * Overriding body rendering
     * @param {CanvasRenderingContext2D} c. Rendering context for the drawing surface
     */
    draw = function (c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();

        const lastPos = this.trail.getOldestPosition();
        if(lastPos) {
            c.beginPath();
            c.strokeStyle = PROJECTILE_COLOR;
            c.lineWidth = 1;
            c.moveTo(this.x, this.y);
            c.lineTo(lastPos.x, lastPos.y);
            c.stroke();
            //console.log(lastPos);
        }
    }

}