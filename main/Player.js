import { Tile } from "./Tile.js";

export class Player {
    constructor(game) {
        this.game = game;

        this.width = 44;
        this.height = 52;
        this.x = 64;
        this.y = 64;

        this.transitionTable = {
            "IDLE_LEFT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_LEFT" },
            "JUMP_LEFT": { "A": "JUMP_LEFT", "D": "JUMP_RIGHT", "Shift + A": "JUMP_LEFT", "Shift + D": "JUMP_RIGHT", "Space": "JUMP_LEFT" },
            "WALK_LEFT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_LEFT" },
            "SPRINT_LEFT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_LEFT" },
            "IDLE_RIGHT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_RIGHT" },
            "JUMP_RIGHT": { "A": "JUMP_LEFT", "D": "JUMP_RIGHT", "Shift + A": "JUMP_LEFT", "Shift + D": "JUMP_RIGHT", "Space": "JUMP_RIGHT" },
            "WALK_RIGHT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_RIGHT" },
            "SPRINT_RIGHT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_RIGHT" }
        };

        this.images = {
            "IDLE_LEFT": ["player/idle-left.png"],
            "JUMP_LEFT": ["player/jump-left.png"],
            "WALK_LEFT": ["player/walk-left_1.png", "player/walk-left_2.png", "player/walk-left_3.png", "player/walk-left_2.png"],
            "SPRINT_LEFT": ["player/sprint-left_1.png", "player/sprint-left_2.png", "player/sprint-left_3.png", "player/sprint-left_4.png", "player/sprint-left_5.png", "player/sprint-left_6.png"],
            "IDLE_RIGHT": ["player/idle-right.png"],
            "JUMP_RIGHT": ["player/jump-right.png"],
            "WALK_RIGHT": ["player/walk-right_1.png", "player/walk-right_2.png", "player/walk-right_3.png", "player/walk-right_2.png"],
            "SPRINT_RIGHT": ["player/sprint-right_1.png", "player/sprint-right_2.png", "player/sprint-right_3.png", "player/sprint-right_4.png", "player/sprint-right_5.png", "player/sprint-right_6.png"],
        };

        this.state = "IDLE_RIGHT";

        this.walking_speed = 0.125;
        this.sprinting_speed = 0.25;
        this.velocity_x = 0;
        this.velocity_y = 0;
    }

    transitionState() {
        let input = null;
        if (this.game.controller.shift.active && this.game.controller.a.active) {
            input = "Shift + A";
        } else if (this.game.controller.shift.active && this.game.controller.d.active) {
            input = "Shift + D";
        } else if (this.game.controller.space.active) {
            input = "Space";
        } else if (this.game.controller.a.active) {
            input = "A";
        } else if (this.game.controller.d.active) {
            input = "D";
        }
        $("#text").text(input);
        if (input !== null) {
            let nextState = this.transitionTable[this.state][input];
            if (nextState) {
                this.state = nextState;
            }
        }
    }

    update() {
        this.transitionState();
        this.draw();
        // $("#text").text(this.state);
    }

    draw() {
        let tile = new Tile(this.game, this.images[this.state][0]);
        this.game.buffer.drawImage(tile.image, this.x, this.y, this.width, this.height);
    }
}