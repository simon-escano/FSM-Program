import { Tile } from "./Tile.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 44;
        this.height = 52;
        this.x = 64;
        this.y = 64;
        this.walking_speed = 1.25;
        this.sprinting_speed = 2.5;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.isJumping = false;
        this.isSprinting = false;
        this.direction = "RIGHT";

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

        this.tile = new Tile(this.game, this.images["IDLE_RIGHT"][this.imageIndex]);
    }

    handleInput() {
        const { shift, a, d, space } = this.game.controller;

        if (space.active && !this.isJumping) {
            this.isJumping = true;
            this.velocity_y = -15;
        }

        if (shift.active) {
            this.isSprinting = true;
        } else {
            this.isSprinting = false;
        }

        if (a.active) {
            this.direction = "LEFT";
            this.velocity_x = this.isSprinting ? -this.sprinting_speed : -this.walking_speed;
        } else if (d.active) {
            this.direction = "RIGHT";
            this.velocity_x = this.isSprinting ? this.sprinting_speed : this.walking_speed;
        } else {
            this.velocity_x = 0;
        }
    }

    update() {
        this.handleInput();
        this.x += this.velocity_x;
        this.y += this.velocity_y;

        if (this.y >= 64) {
            this.y = 64;
            this.isJumping = false;
            this.velocity_y = 0;
        } else {
            this.velocity_y += 1;
        }

        this.draw();
    }

    draw() {
        let state = "IDLE";
        if (this.isJumping) {
            state = "JUMP";
        } else if (this.velocity_x !== 0) {
            state = this.isSprinting ? "SPRINT" : "WALK";
        }

        const frames = this.images[`${state}_${this.direction}`];
        if (this.imageIndex >= frames.length) {
            this.imageIndex = 0;
        }
        this.tile.image.src = "./res/tiles/" + frames[this.imageIndex];
        this.frameCount = (this.frameCount || 0) + 1;
        if (this.frameCount >= (state === "SPRINT" ? 5 : 8)) {
            this.imageIndex = (this.imageIndex + 1) % frames.length;
            this.frameCount = 0;
        }
        this.tile.draw(Math.round(this.x), Math.round(this.y), this.width, this.height);
    }
}
