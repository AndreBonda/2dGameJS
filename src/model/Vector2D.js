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
        vector.v = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
        return vector;
    }

    static FromMagnitude(v, alpha) {
        var vector = new Vector2D(null, null, v, alpha);
        vector.vx = Math.cos(alpha) * v;
        vector.vy = Math.sin(alpha) * v;
        return vector;
    }

    static dot(v1, v2) {
        return v1.vx * v2.vx + v1.vy * v2.vy;
    }

    update(vx, vy) {
        this.vx = vx;
        this.vy = vy;
        this.alpha = Math.atan2(vy, vx);
        this.v = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
    }

    add(f) {
        if (f.constructor.name === Vector2D.name)
            return Vector2D.FromComponents(this.vx + f.vx, this.vy + f.vy)
        else
            return Vector2D.FromComponents(this.vx + f, this.vy + f)
    }

    subtract(f) {
        if (f.constructor.name === Vector2D.name)
            return Vector2D.FromComponents(this.vx - f.vx, this.vy);
        else
            return Vector2D.FromComponents(this.vx - f, this.vy - f);
    }

    multiply(number) {
        return Vector2D.FromComponents(this.vx * number, this.vy * number);
    }
}