var Ox = 0;
var Oy = 0;
var movingBodies = [];

export function getO() {
    return {
        Ox,
        Oy
    }
}

export function setO(x, y) {
    Ox = x;
    Oy = y;
}

export function getBodies() {
    return movingBodies;
}

export function removeBody(id) {
    movingBodies = movingBodies.filter(x => x.id !== id);
}

export const Sides = {
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3
}