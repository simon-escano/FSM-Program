export class Map {
    constructor(game, tiles) {
        this.game = game;
        this.tiles;
    }

    draw() {

    }
}

class Tile {
    constructor(filename) {
        this.image = new Image();
        this.image.src = "./res/tiles/" + filename;
    }

    draw(x, y) {

    }
}