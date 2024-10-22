export class Tile {
    constructor(game, filename) {
        this.game = game;
        this.image = new Image();
        this.image.src = "./res/tiles/" + filename;
    }

    draw(x, y, width, height) {
        this.game.buffer.drawImage(this.image, x, y, width, height);
    }
}