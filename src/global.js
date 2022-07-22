import { GameStatus } from "./consts.js";

var Ox = 0;
var Oy = 0;
var movingBodies = [];
var projectiles = [];
var score = 0;
var gameStatus = GameStatus.STOPPED;
// keeping this varaìiable to avoid double bounce calculation
var enemyBounceCalculated = new Set();

export function getO() {
    return {
        Ox,
        Oy
    }
}

/**
 * Setting "logical" origin of the canvas.
 * @param {number} x center of the canvas.
 * @param {number} y center of the canvas.
 */
export function setO(x, y) {
    Ox = x;
    Oy = y;
}

export function getEnemies() {
    return movingBodies;
}

export function removeEnemy(id) {
    const removed = movingBodies.filter(x => x.id === id);
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
        document.getElementById("play").innerText = 'Play';
    }else {
        gameStatus = GameStatus.RUNNING;
        document.getElementById("play").innerText = 'Pause';
        document.getElementById("scoreModal").style.display = 'none';
    }
}

export function playAgain() {
    gameStatus = GameStatus.RUNNING;
    movingBodies = [];
    projectiles = [];
    score = 0;
    document.getElementById("scoreModal").style.display = 'none';
}

export function endGame() {
    gameStatus = GameStatus.STOPPED;
    document.getElementById("scoreModal").style.display = 'block';
    document.getElementById("finalScore").innerText = score;
}

/**
 * After every animation cycle resetting the balls that are calculated for collision
 */
export function resetEnemyBounceCalculated() {
    enemyBounceCalculated = new Set();
}

/**
 * It avoids the occurrence of double collision calculation of a ball during the same animation cycle.
 * @param {string} id: ball's guid calculated
 * @returns 
 */
export function addEnemyBounceCalculated(id) {
    return enemyBounceCalculated.add(id);
}

export function isBounceCalculated(id) {
    return enemyBounceCalculated.has(id);
}