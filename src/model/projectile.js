import { getO } from "../global.js";
import { MovingBody } from "./movingBody.js";

export class Projectile extends MovingBody {
    constructor(clickX, clickY, massRadius, color) {
        // i proiettili partono dal centro
        // Calcolo Vx e Vy del proiettile rispetto all'origine del canvas dove si trova il player.
        const vx = clickX - getO().Ox;
        const vy = getO().Oy - clickY;
        super(getO().Ox, getO().Oy, massRadius, color, vx, vy, null, null);
    }
}