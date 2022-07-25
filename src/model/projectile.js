import { MIN_PROJECTILE_VELOCITY, PROJECTILE_COLOR } from "../consts.js";
import { MovingBody } from "./movingBody.js";
import { Trail } from "./trail.js";

export class Projectile extends MovingBody {

    constructor(clickX, clickY, radius, color, Ox, Oy) {
        // Projectiles start from the center
        const vx = clickX - Ox;
        const vy = Oy - clickY;
        super(Ox, Oy, radius, color, vx, vy, null, null);
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
}