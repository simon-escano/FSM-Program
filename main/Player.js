import { Tile } from "./Tile.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 44;
        this.height = 52;
        this.x = 64;
        this.y = 64;
        this.state = "JUMP_RIGHT";
        this.imageIndex = 0;
        this.walking_speed = 1.25;
        this.sprinting_speed = 2.5;
        this.velocity_x = 0;
        this.velocity_y = 0;

        this.transitionTable = {
            "IDLE_LEFT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_LEFT", "No Input": "IDLE_LEFT" },
            "JUMP_LEFT": { "A": "JUMP_LEFT", "D": "JUMP_RIGHT", "Shift + A": "JUMP_LEFT", "Shift + D": "JUMP_RIGHT", "Space": "JUMP_LEFT", "No Input": "JUMP_LEFT" },
            "WALK_LEFT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_LEFT", "No Input": "IDLE_LEFT" },
            "SPRINT_LEFT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_LEFT", "No Input": "IDLE_LEFT" },
            "IDLE_RIGHT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_RIGHT", "No Input": "IDLE_RIGHT" },
            "JUMP_RIGHT": { "A": "JUMP_LEFT", "D": "JUMP_RIGHT", "Shift + A": "JUMP_LEFT", "Shift + D": "JUMP_RIGHT", "Space": "JUMP_RIGHT", "No Input": "JUMP_RIGHT" },
            "WALK_RIGHT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_RIGHT", "No Input": "IDLE_RIGHT" },
            "SPRINT_RIGHT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_RIGHT", "No Input": "IDLE_RIGHT" }
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

        this.imageIndex = 0;

        this.walking_speed = 0.125;
        this.sprinting_speed = 0.25;
        this.velocity_x = 0;
        this.velocity_y = 0;
    }

    transitionState() {
        const { shift, a, d, space } = this.game.controller;
        let input = "No Input";

        if (space.active) {
            input = "Space";
            if (!this.state.startsWith("JUMP")) {
                this.velocity_y = -15;
            }
        } else if (shift.active && a.active) {
            input = "Shift + A";
            this.velocity_x = -this.sprinting_speed;
        } else if (shift.active && d.active) {
            input = "Shift + D";
            this.velocity_x = this.sprinting_speed;
        } else if (a.active) {
            input = "A";
            this.velocity_x = -this.walking_speed;
        } else if (d.active) {
            input = "D";
            this.velocity_x = this.walking_speed;
        }

        this.changeState(this.transitionTable[this.state][input]);
    }

    changeState(state) {
        if (this.state !== state) {
            this.imageIndex = 0;
        }
        this.state = state || this.state;
    }

    update() {
        this.transitionState();
        this.x += this.velocity_x;
        this.y += this.velocity_y;
        this.draw();
    }

    draw() {
        const frames = this.images[this.state];
        if (this.imageIndex >= frames.length) {
            this.imageIndex = 0;
        }
        this.tile.image.src = "./res/tiles/" + frames[this.imageIndex];
        this.frameCount = (this.frameCount || 0) + 1;
        if (this.frameCount >= 5) {
            this.imageIndex = (this.imageIndex + 1) % frames.length;
            this.frameCount = 0;
        }
        this.tile.draw(Math.round(this.x), Math.round(this.y), this.width, this.height);
    }
}

