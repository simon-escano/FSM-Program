import { Player } from "./Player.js";

export class World {
    constructor(game, map, friction, gravity) {
        this.game = game;
        this.map = map;
        this.player = new Player(this);

        this.friction = friction;
        this.gravity = gravity;
    }

    collideObject(object) {
        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
        else if (object.y + object.height > this.height - this.tile_size) { 
            object.jumping = false;
            object.y = this.height - object.height - this.tile_size;
            object.velocity_y = 0;
        }
    }

    update() {
        this.player.velocity_y += this.gravity;
        this.player.update();
        this.player.velocity_x *= this.friction;
        this.player.velocity_y *= this.friction;
        this.collideObject(this.player);

        this.draw();
    }

    draw() {
        this.map.draw();
        this.game.context.drawImage(this.game.buffer.canvas, 0, 0, this.game.buffer.canvas.width, this.game.buffer.canvas.height, 0, 0, this.game.context.canvas.width, this.game.context.canvas.height);
    }
}