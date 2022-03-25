export const Sides = {
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3
}

export const GameStatus = {
    RUNNING: 0,
    STOPPED: 1
}

export const projectileRadius = 8;
export const playerRadius = 20;

var Ox = 0;
var Oy = 0;
var movingBodies = [];
var projectiles = [];
var score = 0;
var gameStatus = GameStatus.STOPPED;

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

export function getEnemies() {
    return movingBodies;
}

export function removeEnemy(id) {
    movingBodies = movingBodies.filter(x => x.id !== id);
}

export function getProjectiles() {
    return projectiles;
}

export function removeProjectile(id) {
    projectiles = projectiles.filter(x => x.id !== id);
}

export function increaseScore() {
    score +=1;
}

export function getScore() {
    return score;
}

export function getGameStatus() {
    return gameStatus;
}

export function togglePlayPause() {
    if(gameStatus === GameStatus.RUNNING) {
        gameStatus = GameStatus.STOPPED;
        document.getElementById("playBtn").innerText = "Play";
    }else {
        gameStatus = GameStatus.RUNNING;
        document.getElementById("playBtn").innerText = "Pause";
    }
}