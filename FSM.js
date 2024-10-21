// FSM

class Player {
    constructor(x, y) {
        // STATE DEFINITIONS
        this.states = {
            IDLE: 'idle',
            WALK: 'walk',
            SPRINT: 'sprint',
            JUMP: 'jump'
        };
        this.directions = {
            LEFT: 'left',
            RIGHT: 'right'
        };

        // INITIAL STATE AND VALUES
        this.currentState = this.states.IDLE;
        this.currentDirection = this.directions.RIGHT;
        this.images = {
            idle: [1, 13],
            jump: [6, 18],
            walk: [2, 3, 4, 5, 14, 15, 16, 17],
            sprint: [7, 8, 9, 10, 11, 12, 24, 23, 22, 21, 20, 19]
        };
        this.image = this.images.idle[0];
        this.height = 64;
        this.width = 64;
        this.x = x;
        this.y = y;
        
        // MOVEMENT
        this.jumping = true;
        this.sprinting = false;
        this.walking_speed = 0.125;
        this.sprinting_speed = 0.25;
        this.velocity_x = 0;
        this.velocity_y = 0;
    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.velocity_y -= 15;
            this.currentState = this.states.JUMP;
        }
    }

    moveLeft() {
        this.currentDirection = this.directions.LEFT;
        this.velocity_x -= this.sprinting ? this.sprinting_speed : this.walking_speed;
        this.updateState();
    }

    moveRight() {
        this.currentDirection = this.directions.RIGHT;
        this.velocity_x += this.sprinting ? this.sprinting_speed : this.walking_speed;
        this.updateState();
    }

    sprint() {
        this.sprinting = true;
        this.updateState();
    }

    updateState() {
        if (this.jumping) {
            this.currentState = this.states.JUMP;
        } else if (Math.abs(this.velocity_x) > 0.25) {
            this.currentState = this.sprinting ? this.states.SPRINT : this.states.WALK;
        } else {
            this.currentState = this.states.IDLE;
        }
    }

    update() {
        this.x += this.velocity_x;
        this.y += this.velocity_y;

        this.updateState();
        this.updateImage();
    }

    updateImage() {
        switch (this.currentState) {
            case this.states.JUMP:
                this.image = this.images.jump[this.currentDirection === this.directions.LEFT ? 1 : 0];
                break;
            case this.states.WALK:
                this.image = this.images.walk[
                    (Math.floor(Math.abs(this.x) / 20) % (this.images.walk.length / 2)) +
                    (this.currentDirection === this.directions.LEFT ? (this.images.walk.length / 2) : 0)
                ];
                break;
            case this.states.SPRINT:
                this.image = this.images.sprint[
                    (Math.floor(Math.abs(this.x) / 20) % (this.images.sprint.length / 2)) +
                    (this.currentDirection === this.directions.LEFT ? (this.images.sprint.length / 2) : 0)
                ];
                break;
            case this.states.IDLE:
            default:
                this.image = this.images.idle[this.currentDirection === this.directions.LEFT ? 1 : 0];
                break;
        }
    }
}
