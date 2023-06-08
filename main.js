const COLORS = ["Black", "White", "Yellow", "Red", "Blue", "Green", "Pink"]
COLOR_BACKGROUND = "#202020";
MIN_COLOR_SIMILARITY = 20;
const FPS = 29.976;
var width;
var height;


function init_balls(number_of_balls) {
    ball_arr = new Array();
    var x = 0;
    var y = 0;
    // for (i = 0; i < number_of_balls; i++) {
    for (y = -number_of_balls; y < number_of_balls; y++) {
        for (x = -number_of_balls; x < number_of_balls; x++) {
            var position = new Vector(x * 70, y * 70);
            var speed = new Vector(random(-500, 500), random(-500, 500));
            var radius = random(10, 30);
            var mass = 1;
            var color = color_random_not_similar(COLOR_BACKGROUND, MIN_COLOR_SIMILARITY);
            // var color = (y > 0) ? color_from_rgb(255, 0, 255) : color_from_rgb(50, 255, 0);
            var ball = new Ball(position, speed, radius, mass, color);
            ball_arr.push(ball);
        }
    }
    return (ball_arr);
}



function draw_clear(canvas_context) {
    canvas_context.clearRect(0, 0, width, height, "white");
}

function draw_balls(canvas_context, balls) {
    //TODO: optimize draw balls. dont draw balls outside of viewport.
    balls.for_each_ball(function (ball) {
        var canvas_position = convert_position_to_canvas(ball.get_position());
        var radius = ball.get_radius() / scale;
        var color = ball.get_color();
        // console.log(ball);
        canvas_context.fillStyle = color_to_string(color);
        canvas_context.beginPath();
        canvas_context.ellipse(canvas_position.x, canvas_position.y, radius, radius, 0, 0, 2 * Math.PI);
        canvas_context.fill();
    })
}

function draw_time(canvas_context, simulation_time){
    canvas_context.font = "20px Arial";
    canvas_context.fillStyle = "White";
    canvas_context.fillText("Simulation Time: " + (simulation_time.t).toFixed(3), 0, 20);
}

function draw(canvas_context, balls, simulation_time) {
    draw_clear(canvas_context);
    draw_balls(canvas_context, balls);
    draw_time(canvas_context, simulation_time);
}

function advance_simulation(time_step, simulation_time, balls){
    if (frozen) return;
    balls.advance(time_step);
    balls.check_collisions();
    simulation_time.t += time_step;
}

var id1 = null;
var id2 = null;
var frozen = false;

/*
if mouse event are on ball, send it to the balls
if on simulation timing toolbar, send to it
if not, send to viewport.
*/
function main() {
    if (id1) clearInterval(id1);
    if (id2) clearInterval(id2);
    document.body.style.backgroundColor = COLOR_BACKGROUND;
    canvas = document.getElementById("canvas");
    canvas.style.backgroundColor = COLOR_BACKGROUND;
    canvas_context = canvas.getContext("2d");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    height = canvas.clientHeight
    width = canvas.clientWidth;
    canvas.width = width;
    canvas.height = height;
    addEventListener("keydown", canvas_key_pressed);
    canvas.addEventListener("wheel", canvas_wheel);
    canvas.addEventListener("click", canvas_click);
    
    balls_v1 = new BallsV1(init_balls(20));
    var time_strech = 1;
    var time_step = 0.01;
    var simulation_time = {t: 0};
    
    id1 = setInterval(draw, 1000 / FPS, canvas_context, balls_v1, simulation_time);
    id2 = setInterval(advance_simulation, time_step * 1000 * time_strech, time_step, simulation_time, balls_v1);
}

function canvas_key_pressed(event) {
    switch (event.key) {
        case 'r':
            main();
            break;
        default:
            break;
    }
}

function canvas_click(event) {
    frozen = !frozen;
}

function canvas_wheel(event) {
    scale += event.deltaY / 500;
    if (scale < 1) scale = 1; 
}