export class Controller {
    constructor(game) {
        this.game = game;

        this.a = new ButtonInput();
        this.d = new ButtonInput();
        this.space = new ButtonInput();
        this.shift = new ButtonInput();
    }

    keyDownUp(type, key_code) {
        const down = (type === "keydown");
        let button;
        switch (key_code) {
            case 16:
                button = $("#sprint-btn");
                this.shift.getInput(down);
                break;
            case 65:
                button = $("#left-btn");
                this.a.getInput(down);
                break;
            case 32:
                button = $("#jump-btn");
                this.space.getInput(down);
                break;
            case 68:
                button = $("#right-btn");
                this.d.getInput(down);
                break;
        }
        button?.toggleClass("bg-gray-600/50", down);
    }
}

class ButtonInput {
    constructor() {
        this.active = this.down = false;
    }

    getInput(down) {
        if (this.down !== down) this.active = down;
        this.down = down;
    }
}