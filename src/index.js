import { Controller } from "./controller.js";
import { Model } from "./model.js";
import { View } from "./view.js";

var model = new Model();
const controller = new Controller(model, new View());

function loop() {
    controller.animate();
    requestAnimationFrame(loop);
}
loop();