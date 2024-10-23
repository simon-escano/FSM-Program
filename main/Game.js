import { Controller } from "./Controller.js";
import { World } from "./World.js";
import { Map } from "./Map.js";

export class Game {
    constructor(container, canvas) {
        this.controller = new Controller(this);

        this.world = new World(this, new Map(this, 64, [
            ["bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png"],
            ["bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png"],
            ["bg/grass_1.png", "bg/grass_2.png", "bg/grass_3.png", "bg/grass_1.png", "bg/grass_2.png", "bg/grass_3.png", "bg/grass_1.png", "bg/grass_2.png"],
            ["bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png"],
        ]), 0.9, 0.9);

        this.container = container;
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");
        this.resize();

        $(window).on("keydown keyup", (event) => {
            this.controller.keyDownUp(event.type, event.keyCode);
        });
    }

    start(fps = 60) {
        this.frameDuration = 1000 / fps;
        this.lastFrameTime = 0;
    
        const loop = (timestamp) => {
            if (timestamp >= this.lastFrameTime + this.frameDuration) {
                this.lastFrameTime = timestamp;
                this.update();
            }
            this.animationFrameRequest = window.requestAnimationFrame(loop);
        };
        this.animationFrameRequest = window.requestAnimationFrame(loop);
    }
    
    stop() {
        window.cancelAnimationFrame(this.animationFrameRequest);
    }

    update() {
        this.world.update();
    }

    resize() {
        const containerAspectRatio = this.container.clientWidth / this.container.clientHeight;
        const canvasAspectRatio = this.buffer.canvas.width / this.buffer.canvas.height;

        if (containerAspectRatio < canvasAspectRatio) {
            this.context.canvas.height = this.container.clientHeight;
            this.context.canvas.width = this.container.clientHeight * canvasAspectRatio;
        } else {
            this.context.canvas.width = this.container.clientWidth;
            this.context.canvas.height = this.container.clientWidth / canvasAspectRatio;
        }

        this.buffer.canvas.height = this.world.map.height;
        this.buffer.canvas.width = this.world.map.width;

        this.context.imageSmoothingEnabled = false;
    }
}