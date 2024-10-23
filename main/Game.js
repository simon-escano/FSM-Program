import { Controller } from "./Controller.js";
import { Player } from "./Player.js";
import { Map } from "./Map.js";

export class Game {
    constructor(container, canvas, friction, gravity) {
        this.controller = new Controller(this);

        this.map = new Map(this, 64, [
            ["bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png"],
            ["bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png", "bg/sky-3.png"],
            ["bg/grass_1.png", "bg/grass_2.png", "bg/grass_3.png", "bg/grass_1.png", "bg/grass_2.png", "bg/grass_3.png", "bg/grass_1.png", "bg/grass_2.png"],
            ["bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png", "bg/ground.png"],
        ]);

        this.player = new Player(this);

        this.friction = friction;
        this.gravity = gravity;

        this.container = container;
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");
        this.resize();

        $(window).on("keydown keyup", (event) => {
            this.controller.keyDownUp(event.type, event.keyCode);
        });

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

    update() {
        this.map.draw();

        this.player.velocity_y += this.gravity;
        this.player.update();
        this.player.velocity_x *= this.friction;
        this.player.velocity_y *= this.friction;
        this.collideObject(this.player);

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

        this.buffer.canvas.height = this.world.map.height;
        this.buffer.canvas.width = this.world.map.width;

        this.context.imageSmoothingEnabled = false;
    }

    collideObject(object) {
        if (object.x < 0) {
            object.x = 0;
            object.velocity_x = 0;
        } else if (object.x + object.width > this.map.width) {
            object.x = this.map.width - object.width;
            object.velocity_x = 0;
        }

        if (object.y < 0) {
            object.y = 0;
            object.velocity_y = 0;
        } else if (object.y + object.height > this.map.height - this.map.tileSize) {
            if (object.state.split("_")[0] === "JUMP") {
                object.changeState("IDLE_" + object.state.split("_")[1]);
            }
            object.y = this.map.height - object.height - this.map.tileSize;
            object.velocity_y = 0;
        }
    }
}