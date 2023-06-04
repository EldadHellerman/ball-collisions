const COLORS = ["Black", "White", "Yellow", "Red", "Blue", "Green", "Pink"]
const FPS = 29.976;
var width = 700;
var height = 700;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    add(vector) {
        // vector addition
        this.x += vector.x;
        this.y += vector.y;
    }
}

class Ball {
    //x y 
    //vx, vy
    //radius
    //color
    // get_position().x
    constructor(position, speed, radius, mass, color) {
        this.position = position;
        this.speed = speed;
        this.radius = radius;
        this.mass = mass;
        this.color = color;
    }

    get_position() { return this.position; }
    get_speed() { return this.speed; }
    get_radius() { return this.radius; }
    get_mass() { return this.mass; }
    get_color() { return this.color; }

    set_position(vector) { this.position = vector; }
    set_speed(s) { this.speed = s; }
    set_radius(r) { this.radius = r; }
    set_mass(m) { this.mass = m; }
    set_color(c) { this.color = c; }
}

function init_balls(number_of_balls) {
    ball_arr = new Array();
    var x = 0;
    var y = 0;
    for (y = 0; y < number_of_balls; y++) {
        for (x = 0; x < number_of_balls; x++) {
            var position = new Vector(x*50, y*50);
            var speed = new Vector(Math.floor(Math.random() * (15 + 10 + 1)) - 10, Math.floor(Math.random() * (15 + 10 + 1)) - 10);
            var radius = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
            var mass = 1;
            // var color = COLORS[Math.floor(Math.random() * COLORS.length)];
            var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
            var ball = new Ball(position, speed, radius, mass, color);
            ball_arr.push(ball);
        }
    }
    // for (i = 0; i < number_of_balls; i++) {
    //     var position = new Vector(x, y);
    //     var speed = new Vector(0, 0);
    //     var radius = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    //     var mass = 1;
    //     // var color = COLORS[Math.floor(Math.random() * COLORS.length)];
    //     var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    //     var ball = new Ball(position, speed, radius, mass, color);
    //     ball_arr.push(ball);
    //     x += 50;
    //     y += 50;
    // }
    return (ball_arr);
}

function convert_canvas_to_position(position) {
    return (new Vector(position.x, position.y));
}

var scale = 10;
function convert_position_to_canvas(position) {
    return (new Vector(position.x / scale + width/2, height - (position.y / scale + height/2)));
}


function draw_ball(canvas_context, ball) {
    var canvas_position = convert_position_to_canvas(ball.get_position());
    var radius = ball.get_radius() / scale;
    var color = ball.get_color();

    canvas_context.fillStyle = color;
    canvas_context.beginPath();
    canvas_context.ellipse(canvas_position.x, canvas_position.y, radius, radius, 0, 0, 2 * Math.PI);
    canvas_context.fill();
}

function ball_advance(ball, time) {
    speed = ball.get_speed()
    moved = new Vector(speed.x, speed.y);
    moved.mult(time);
    ball.get_position().add(moved);
    // ball.set_position(ball.get_position().add(ball.set_position));
}

function draw_balls(canvas_context, balls) {
    balls.forEach(function (ball) { draw_ball(canvas_context, ball); })
}

function advance_balls(balls, time_step) {
    balls.forEach(function (ball) { ball_advance(ball, time_step); })
}

function reset_canvas(canvas_context) {
    canvas_context.clearRect(0, 0, width, height, "white");
}

function draw(canvas_context, balls){
    reset_canvas(canvas_context);
    draw_balls(canvas_context, balls);
}

function iteration(balls, time_step){
    advance_balls(balls, time_step);
}

var balls;
var id1 = null;
var id2 = null;

function main() {
    if(id1) clearInterval(id1);
    if(id2) clearInterval(id2);
    canvas = document.getElementById("canvas");
    canvas_context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    document.onkeypress = function (e) { if (window.event) keyPressed(e.keyCode); else if (e.which) keyPressed(e.keyCode); };
    
    balls = init_balls(50);
    var time = 0;
    var time_step = 0.02;

    id1 = setInterval(draw, 1000 / FPS, canvas_context, balls);
    id2 = setInterval(advance_balls, time_step * 1000, balls, time_step);

}



function keyPressed(code) {
    if (code == 114){
        main();
    }
    /*if (code == 119 && currentDirection != "down") direction = "up";
    else if (code == 115 && currentDirection != "up") direction = "down";
    else if (code == 100 && currentDirection != "left") direction = "right";
    else if (code == 97 && currentDirection != "right") direction = "left";*/
}

/*c.font = "60px Arial";
c.fillStyle = "black";
c.fillText("Game Over!", 450, 280);

*/