import { Tile } from "./Tile.js";

export class Player {
    constructor(game) {
        this.game = game;

        this.width = 44;
        this.height = 52;
        this.x = 64;
        this.y = 64;
        
        this.states = {
            IDLE_LEFT: ["player/idle-left.png"],
            JUMP_LEFT: ["player/jump-left.png"],
            WALK_LEFT: ["player/walk-left_1.png", "player/walk-left_2.png", "player/walk-left_3.png", "player/walk-left_2.png"],
            SPRINT_LEFT: ["player/sprint-left_1.png", "player/sprint-left_2.png", "player/sprint-left_3.png", "player/sprint-left_4.png", "player/sprint-left_5.png", "player/sprint-left_6.png"],
            IDLE_RIGHT: ["player/idle-right.png"],
            JUMP_RIGHT: ["player/jump-right.png"],
            WALK_RIGHT: ["player/walk-right_1.png", "player/walk-right_2.png", "player/walk-right_3.png", "player/walk-right_2.png"],
            SPRINT_RIGHT: ["player/sprint-right_1.png", "player/sprint-right_2.png", "player/sprint-right_3.png", "player/sprint-right_4.png", "player/sprint-right_5.png", "player/sprint-right_6.png"],
        }

        this.walking_speed = 0.125;
        this.sprinting_speed = 0.25;
        this.velocity_x = 0;
        this.velocity_y = 0;
    }

    draw() {
        let tile = new Tile(this.game, this.states.IDLE_RIGHT[0]);
        this.game.buffer.drawImage(tile.image, this.x, this.y, this.width, this.height);
    }
}