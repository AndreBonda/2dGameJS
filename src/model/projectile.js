import { getO } from "../global.js";
import { MovingBody } from "./movingBody.js";

export class Projectile extends MovingBody {
    constructor(clickX, clickY, radius, color) {
        // i proiettili partono dal centro
        super(getO().Ox, getO().Oy, radius, color);
        this.calculateMovement(clickX, clickY, false);
    }
}