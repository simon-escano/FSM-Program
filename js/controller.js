class ButtonInput {
    constructor() {
        this.active = this.down = false;
    }

    getInput(down) {
        if (this.down !== down) this.active = down;
        this.down = down;
    }
}

class Controller {
    constructor() {
        this.a = new ButtonInput();
        this.d = new ButtonInput();
        this.space = new ButtonInput();
        this.shift = new ButtonInput();
        this.bindButtons();
    }

    bindButtons() {
        $("#sprint-btn").on("mousedown mouseup", (event) => this.shift.getInput(event.type === "mousedown"));
        $("#jump-btn").on("mousedown mouseup", (event) => this.space.getInput(event.type === "mousedown"));
        $("#left-btn").on("mousedown mouseup", (event) => this.a.getInput(event.type === "mousedown"));
        $("#right-btn").on("mousedown mouseup", (event) => this.d.getInput(event.type === "mousedown"));
    }

    keyDownUp(type, key_code) {
        const down = (type === "keydown");
        switch (key_code) {
            case 16:
                this.shift.getInput(down);
                if (down) {
                    $("#sprint-btn").addClass("bg-gray-600/50");
                } else {
                    $("#sprint-btn").removeClass("bg-gray-600/50");
                }
                break;
            case 65:
                this.a.getInput(down);
                if (down) {
                    $("#left-btn").addClass("bg-gray-600/50");
                } else {
                    $("#left-btn").removeClass("bg-gray-600/50");
                }
                break;
            case 32:
                this.space.getInput(down);
                if (down) {
                    $("#jump-btn").addClass("bg-gray-600/50");
                } else {
                    $("#jump-btn").removeClass("bg-gray-600/50");
                }
                break;
            case 68:
                this.d.getInput(down);
                if (down) {
                    $("#right-btn").addClass("bg-gray-600/50");
                } else {
                    $("#right-btn").removeClass("bg-gray-600/50");
                }
                break;
        }
    }
}
