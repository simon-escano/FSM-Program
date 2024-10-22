

export class Game {
    constructor(canvas) {
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");

        this.map = new Map(this, [
            [],
            [],
            [],
            [],
            [],
        ]);

        this.controller = new Controller(this);
    }
}