import { Map } from "./Map.js";
import { Controller } from "./Controller.js";
import { Player } from "./Player.js";

export class Game {
    constructor(container, canvas) {
        this.container = container;
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");
        this.resize();

        this.map = new Map(this, 64, [
            ["bg/ground.png"],
            ["bg/ground.png"],
        ]);

        this.player = new Player(this);

        this.controller = new Controller(this);
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
        this.render()
    }

    render() {
        this.map.draw();
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    resize() {
        const gameAspectRatio = this.container.clientWidth / this.container.clientHeight;
        const canvasAspectRatio = this.context.canvas.width / this.context.canvas.height;

        if (gameAspectRatio < canvasAspectRatio) {
            this.context.canvas.height = this.container.clientHeight;
            this.context.canvas.width = this.container.clientHeight * canvasAspectRatio;
        } else {
            this.context.canvas.width = this.container.clientWidth;
            this.context.canvas.height = this.container.clientWidth / canvasAspectRatio;
        }

        this.context.canvas.style.width = `${this.context.canvas.width}px`;
        this.context.canvas.style.height = `${this.context.canvas.height}px`;
        this.context.imageSmoothingEnabled = false;
    }
}