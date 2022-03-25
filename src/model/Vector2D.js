export class Vector2D {
    constructor(vx, vy, v, alpha) {
        this.vx = vx;
        this.vy = vy;
        this.v = v;
        this.alpha = alpha;
    }

    static FromComponents(vx, vy) {
        const vector = new Vector2D(vx, vy, null, null);
        vector.alpha = Math.atan2(vy, vx);
        vector.v = Math.sqrt(Math.pow(vx,2) + Math.pow(vy, 2));
        return vector;
    }

    static FromMagnitude(v, alpha) {
        var vector = new Vector2D(null, null, v, alpha);
        vector.vx = Math.cos(alpha) * v;
        vector.vy = Math.sin(alpha) * v;
        return vector;
    }
}