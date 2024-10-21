// NON FSM

class Player {
    constructor(x, y) {
        this.images = {
            "idle-left": [13],
            "jump-left": [18],
            "walk-left": [14, 15, 16, 17],
            "sprint-left": [19, 20, 21, 22, 23, 24],
            "idle-right": [1],
            "jump-right": [6],
            "walk-right": [2, 3, 4, 5],
            "sprint-right": [7, 8, 9, 10, 11, 12],
        }
        this.image = this.images["idle-right"][0];
        this.height = 64;
        this.jumping = true;
        this.sprinting = false;
        this.walking_speed = 0.125;
        this.sprinting_speed = 0.25;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.width = 64;
        this.x = x;
        this.y = y;
    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.velocity_y -= 20;
        }
    }
    moveLeft() {
        if (this.sprinting) {
            this.velocity_x -= this.sprinting_speed;
        } else {
            this.velocity_x -= this.walking_speed;
        }
    }
    moveRight() { 
        if (this.sprinting) {
            this.velocity_x += this.sprinting_speed;
        } else {
            this.velocity_x += this.walking_speed;
        }
    }
    sprint() {
        this.sprinting = true;
    }
    update() {
        this.x += this.velocity_x;
        this.y += this.velocity_y;

        if (this.jumping) {
            this.image = this.images[this.velocity_x < 0 ? "jump-left" : "jump-right"][0];
        } else {
            if (this.velocity_x >= 0) {
                if (this.velocity_x > 0.25) {
                    if (this.sprinting) {
                        this.image = this.images["sprint-right"][(Math.floor(this.x / 20) % this.images["sprint-right"].length)];
                    } else {
                        this.image = this.images["walk-right"][(Math.floor(this.x / 20) % this.images["walk-right"].length)];
                    }
                } else {
                    this.image = this.images["idle-right"][0];
                }
            } else if (this.velocity_x <= 0) {
                if (this.velocity_x < -0.25) {
                    if (this.sprinting) {
                        this.image = this.images["sprint-left"][(Math.floor(this.x / 20) % this.images["sprint-left"].length)];
                    } else {
                        this.image = this.images["walk-left"][(Math.floor(this.x / 20) % this.images["walk-right"].length)];
                    }
                } else {
                    this.image = this.images["idle-left"][0];
                }
            }
        }
    }
} 