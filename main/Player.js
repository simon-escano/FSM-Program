import { Tile } from "./Tile.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 52;
        this.height = 56;
        this.x = 64;
        this.y = 64;
        this.walking_speed = 0.2;
        this.sprinting_speed = 0.4;
        this.velocity_x = 0;
        this.velocity_y = 0;
        
        this.transitionTable = {
            "IDLE_LEFT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_LEFT", "No Input": "IDLE_LEFT" },
            "JUMP_LEFT": { "A": "JUMP_LEFT", "D": "JUMP_RIGHT", "Shift + A": "JUMP_LEFT", "Shift + D": "JUMP_RIGHT", "Space": "JUMP_LEFT", "No Input": "JUMP_LEFT" },
            "FALL_LEFT": { "A": "FALL_LEFT", "D": "FALL_RIGHT", "Shift + A": "FALL_LEFT", "Shift + D": "FALL_RIGHT", "Space": "FALL_LEFT", "No Input": "FALL_LEFT" },
            "WALK_LEFT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_LEFT", "No Input": "IDLE_LEFT" },
            "SPRINT_LEFT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_LEFT", "No Input": "IDLE_LEFT" },
            "IDLE_RIGHT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_RIGHT", "No Input": "IDLE_RIGHT" },
            "JUMP_RIGHT": { "A": "JUMP_LEFT", "D": "JUMP_RIGHT", "Shift + A": "JUMP_LEFT", "Shift + D": "JUMP_RIGHT", "Space": "JUMP_RIGHT", "No Input": "JUMP_RIGHT" },
            "FALL_RIGHT": { "A": "FALL_LEFT", "D": "FALL_RIGHT", "Shift + A": "FALL_LEFT", "Shift + D": "FALL_RIGHT", "Space": "FALL_RIGHT", "No Input": "FALL_RIGHT" },
            "WALK_RIGHT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_RIGHT", "No Input": "IDLE_RIGHT" },
            "SPRINT_RIGHT": { "A": "WALK_LEFT", "D": "WALK_RIGHT", "Shift + A": "SPRINT_LEFT", "Shift + D": "SPRINT_RIGHT", "Space": "JUMP_RIGHT", "No Input": "IDLE_RIGHT" }
        };
        
        this.state = "FALL_RIGHT";

        this.images = {
            "IDLE_LEFT": ["char/idle-left.png"],
            "JUMP_LEFT": ["char/jump-left_1.png", "char/jump-left_2.png"],
            "FALL_LEFT": ["char/fall-left_1.png", "char/fall-left_2.png"],
            "WALK_LEFT": ["char/walk-left_1.png", "char/walk-left_2.png", "char/walk-left_3.png", "char/walk-left_2.png"],
            "SPRINT_LEFT": ["char/sprint-left_1.png", "char/sprint-left_2.png", "char/sprint-left_3.png", "char/sprint-left_4.png", "char/sprint-left_5.png", "char/sprint-left_6.png"],
            "IDLE_RIGHT": ["char/idle-right.png"],
            "JUMP_RIGHT": ["char/jump-right_1.png", "char/jump-right_2.png"],
            "WALK_RIGHT": ["char/walk-right_1.png", "char/walk-right_2.png", "char/walk-right_3.png", "char/walk-right_2.png"],
            "SPRINT_RIGHT": ["char/sprint-right_1.png", "char/sprint-right_2.png", "char/sprint-right_3.png", "char/sprint-right_4.png", "char/sprint-right_5.png", "char/sprint-right_6.png"],
            "FALL_RIGHT": ["char/fall-right_1.png", "char/fall-right_2.png"]
        };
        this.imageIndex = 0;

        this.tile = new Tile(this.game, this.images[this.state][this.imageIndex]);
    }

    transitionState() {
        const { shift, a, d, space } = this.game.controller;
        let input = "No Input";

        if (space.active) {
            input = "Space";
        } else if (shift.active && a.active) {
            input = "Shift + A";
        } else if (shift.active && d.active) {
            input = "Shift + D";
        } else if (a.active) {
            input = "A";
        } else if (d.active) {
            input = "D";
        }

        if (space.active && (!this.state.startsWith("JUMP") && !this.state.startsWith("FALL"))) {
            this.velocity_y -= 15;
        } if (shift.active && a.active) {
            this.velocity_x -= this.sprinting_speed;
        } if (shift.active && d.active) {
            this.velocity_x += this.sprinting_speed;
        } if (a.active) {
            this.velocity_x -= this.walking_speed;
        } if (d.active) {
            this.velocity_x += this.walking_speed;
        }

        this.changeState(this.transitionTable[this.state][input]);
    }

    changeState(state) {
        if (this.state !== state) {
            this.imageIndex = 0;
        }
        this.state = state || this.state;
        $("#state").text(this.state);
        switch (this.state) {
            case "IDLE_LEFT":
                $("#state").css("background-color", "#dd7e6b");
                break;
            case "JUMP_LEFT":
                $("#state").css("background-color", "#ea9999");
                break;
            case "WALK_LEFT":
                $("#state").css("background-color", "#f9cb9c");
                break;
            case "SPRINT_LEFT":
                $("#state").css("background-color", "#ffe599");
                break;
            case "IDLE_RIGHT":
                $("#state").css("background-color", "#a2c4c9");
                break;
            case "JUMP_RIGHT":
                $("#state").css("background-color", "#a4c2f4");
                break;
            case "WALK_RIGHT":
                $("#state").css("background-color", "#b4a7d6");
                break;
            case "SPRINT_RIGHT":
                $("#state").css("background-color", "#d5a6bd");
                break;
        }
    }

    update() {
        this.transitionState();
        this.x += this.velocity_x;
        this.y += this.velocity_y;
        if (this.state.startsWith("JUMP")) {
            if (Math.round(this.velocity_y) >= 0) {
                this.state = "FALL_" + this.state.split("_")[1];
            }
        }
        this.draw();
    }

    draw() {
        const frames = this.images[this.state];
        if (this.imageIndex >= frames.length) {
            this.imageIndex = 0;
        }
        this.tile.image.src = "./res/tiles/" + frames[this.imageIndex];
        this.frameCount = (this.frameCount || 0) + 1;
        if (this.frameCount >= (this.state.startsWith("SPRINT") ? 5 : 8)) {
            this.imageIndex = (this.imageIndex + 1) % frames.length;
            this.frameCount = 0;
        }
        this.tile.draw(Math.round(this.x), Math.round(this.y), this.width, this.height);
    }
}