// get canvas
let canvas = $("#bg")[0];

// make it high res
canvas.width = $(document).width() * 2;
canvas.height = $(document).height() * 2;
canvas.style.width = canvas.width / 2;
canvas.style.height = canvas.height / 2;
let ctx = canvas.getContext("2d");

// so it doesn't lag out mobile
const mobile_factor = $(window).width() > 1000? 1: 0.5;
// setup constants
ctx.lineWidth = 5 * mobile_factor;
const colors = [
    "rgb(255, 0, 0)",
    "rgb(255, 84, 0)",
    "rgb(255, 204, 0)",
    "rgb(127, 255, 0)",
    "rgb(0, 255, 237)",
    "rgb(0, 0, 255)",
    "rgb(97, 0, 255)",
    "rgb(255, 0, 246)"
];
const speed_scale_factor = 0.05;
const ball_radius = 10 * mobile_factor;
const max_connect_radius = 200 * mobile_factor;

class Ball {

    constructor() {
        this.reset();
    }

    reset() {
        this.radius = ball_radius;
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height);
        // setup movement vector
        this.x_v = Math.random();
        this.y_v = Math.sqrt(1 - this.x_v ** 2);
        this.x_v = this.x_v * colors.length * speed_scale_factor;
        this.y_v = this.y_v * colors.length * speed_scale_factor;
        this.x_v = this.x_v * (Math.random() < 0.5? -1: 1);
        this.y_v = this.y_v * (Math.random() < 0.5? -1: 1);
        // random color from list
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    move() {
        this.x += this.x_v;
        this.y += this.y_v;
        // let them go fully off screen,
        // invert signs for perfect collisions
        if (this.x > canvas.width + ball_radius ||
            this.x < -ball_radius ||
            this.y > canvas.height + ball_radius ||
            this.y < -ball_radius) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2* Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    connect(balls) {
        balls.forEach((ball) => {
            // check distance
            if (Math.sqrt((this.x - ball.x) ** 2 + (this.y - ball.y) ** 2) < max_connect_radius) {
                // draw line with gradient
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(ball.x, ball.y);
                let gradient =ctx.createLinearGradient(this.x, this.y, ball.x, ball.y);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, ball.color);
                ctx.strokeStyle = gradient;
                ctx.stroke();
            }
        })
    }
}

// initialize
balls = [];
for (let i = 0; i < 100 * mobile_factor; i++) {
    balls.push(new Ball());
}

// update
draw_all = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {ball.move(); ball.connect(balls); ball.draw()})
};
setInterval(draw_all, 1);