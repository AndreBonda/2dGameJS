import { addEnemyBounceCalculated, isBounceCalculated } from "./global.js";
import { Vector2D } from "./model/Vector2D.js";

/**
 * Collision handler between two balls.
 * Algorithm used: https://drive.google.com/file/d/15TYPgM5kzLBmrZUoi3hJDEWB8lAw0LEE/view?usp=sharing
 * @param {Enemy} b1 
 * @param {Enemy} b2 
 */
export function collision(b1, b2) {
    // TODO: fix collision: sometimes two balls remain attached
    if (!isBounceCalculated(b1.id)) {
        addEnemyBounceCalculated(b1.id);
        addEnemyBounceCalculated(b2.id);

        // normal vector
        const normal = Vector2D.FromComponents(b1.x - b2.x, b2.y - b1.y);

        // unit normal vector
        const unitnormal = normal.multiply(1 / normal.v);

        // unit tangent vector
        const unittangent = Vector2D.FromComponents(-unitnormal.vy, unitnormal.vx);

        // Project velocities onto the unit normal and unit tangent vectors
        const v1n = Vector2D.dot(unitnormal, b1.vector);
        const v1t = Vector2D.dot(unittangent, b1.vector);
        const v2n = Vector2D.dot(unitnormal, b2.vector);
        const v2t = Vector2D.dot(unittangent, b2.vector);

        //tangential velocities don't change
        //normal velocities after collision
        let v1nAfter = v2n;
        let v2nAfter = v1n;

        // not working
        // let v1nAfter = (v1n * (b1.mass - b2.mass) + 2 * b2.mass * v2n) / (b1.mass + b2.mass);
        // let v2nAfter = (v2n * (b2.mass - b1.mass) + 2 * b1.mass * v1n) / (b1.mass + b2.mass);

        // Convert normal and tangential scalar into vectors
        v1nAfter = unitnormal.multiply(v1nAfter);
        const v1tAfter = unittangent.multiply(v1t);
        v2nAfter = unitnormal.multiply(v2nAfter);
        const v2tAfter = unittangent.multiply(v2t);

        // update velocities
        b1.vector = v1nAfter.add(v1tAfter);
        b2.vector = v2nAfter.add(v2tAfter);
    }
}