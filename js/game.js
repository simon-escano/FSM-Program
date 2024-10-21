class Game {
    constructor() {
        this.world = new World();
    }

    update() {
        this.world.update();
    }
}

class World {
    constructor (friction = 0.9, gravity = 0.9) {
        this.friction = friction;
        this.gravity = gravity;
        this.player = new Player(192, 64);
        this.columns = 8;
        this.rows = 5;
        this.tile_size = 64;
        this.map = [
            34, 35, 35, 35, 34, 34, 35, 34,
            31, 32, 33, 30, 31, 32, 33, 30,
            29, 29, 29, 29, 29, 29, 29, 29,
            26, 27, 28, 26, 27, 28, 26, 27,
            25, 25, 25, 25, 25, 25, 25, 25,
        ];
        this.height = this.tile_size * this.rows;
        this.width = this.tile_size * this.columns;
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
    }
}