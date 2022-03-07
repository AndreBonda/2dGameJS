import { Body } from "./body.js";
import { getO } from "../global.js";

export class MovingBody extends Body {
    constructor(directionX, directionY, radius, color) {
        super(directionX, directionY, radius, color);
    }

    // Funzione che calcola la velocità e l'angolo di un corpo
    calculateMovement(clickX, clickY, fixedVelocity) {
        // Calcolo Vx e Vy del proiettile rispetto all'origine del canvas dove si trova il player.
        const vx = clickX - getO().Ox;
        const vy = getO().Oy - clickY;

        // Ricavo il valore assoluto di vx e vy per utilizzare il teorema di pitagora per calcolare la velocità,
        // data dall'ipotenusa.
        const absVx = Math.abs(vx);
        const absVy = Math.abs(vy);

        if(fixedVelocity)
        this.velocity = 800;
        else
        this.velocity = Math.sqrt(Math.pow(absVx, 2) + Math.pow(absVy, 2)) * 2;
        
        this.alpha = Math.atan2(vy, vx);
    }
    

    update() {
        /**
         * La y viene negata poichè l'origine del canvas in realtà è in alto a sinistra della finestra.
         * Quindi se voglio muovere un corpo verso l'alto dovro decrementare la sua coordinata y, diversamente dovrò incrementarla se voglio muovere verso il basso.
         * La velocità è calcolata tramite il piano cartesiano tra il centro logico del canvas (calcolato nell'index) e il punto in cui clicco.
         * Più clicco lontano dal centro, più la velocità sarà alta.
         * Quindi le coordinate le moltiplico per la velocità / 200.
        */
        this.x += Math.cos(this.alpha) * this.velocity / 200;
        this.y += -Math.sin(this.alpha) * this.velocity / 200;
    }

}