import { Map } from "./Map.js";
import { Controller } from "./Controller.js";
import { Player } from "./Player.js";

export class Game {
    constructor(container, canvas) {
        this.map = new Map(this, 64, [
            ["bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png"],
            ["bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png"],
            ["bg/grass_1.png", "bg/grass_2.png", "bg/grass_3.png", "bg/grass_1.png", "bg/grass_2.png", "bg/grass_3.png", "bg/grass_1.png", "bg/grass_2.png"],
            ["bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png"],
        ]);

        this.player = new Player(this);

        this.controller = new Controller(this);

        this.container = container;
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");
        this.resize();
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
        this.player.update();
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
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

        this.buffer.canvas.height = this.map.height;
        this.buffer.canvas.width = this.map.width;

        this.context.imageSmoothingEnabled = false;
    }
}