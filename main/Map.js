import { Tile } from "./Tile.js";

export class Map {
    constructor(game, tileSize, tileData) {
        this.game = game;
        this.tileSize = tileSize;
        this.rows = tileData.length;
        this.columns = tileData[0].length;
        this.width = this.columns * tileSize;
        this.height = this.rows * tileSize;
        this.tiles = tileData.map(row => row.map(filename => new Tile(game, filename)));
    }

    draw() {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                this.tiles[y][x].draw(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }
}