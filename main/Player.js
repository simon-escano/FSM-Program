import { Tile } from "./Tile.js";

export class Player {
    constructor(world) {
        this.world = world;

        this.width = 44;
        this.height = 52;
        this.x = 64;
        this.y = 64;

        this.state = "IDLE_RIGHT";

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
        let input;

        const { shift, a, d, space } = this.world.game.controller;

        if (space.active) input = "Space";
        else if (shift.active && a.active) input = "Shift + A";
        else if (shift.active && d.active) input = "Shift + D";
        else if (a.active) input = "A";
        else if (d.active) input = "D";
        else input = "No Input";

        $("#text").text("Input: " + input);
        
        this.state = this.transitionTable[this.state][input] || this.state;
    }

    update() {
        this.transitionState();
        this.draw();
    }

    draw() {
        const frames = this.images[this.state];
        const tile = new Tile(this.world.game, frames[this.imageIndex]);

        this.frameCount = (this.frameCount || 0) + 1;

        if (this.frameCount >= 5) {
            this.imageIndex = (this.imageIndex + 1) % frames.length;
            this.frameCount = 0;
        }
        this.world.game.buffer.drawImage(tile.image, this.x, this.y, this.width, this.height);
    }
}
