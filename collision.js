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
            var position = new Vector(x * 50, y * 50);
            var speed = new Vector(random(-500, 500), random(-500, 500));
            var radius = random(10, 30);
            var mass = 1;
            do var color = random_color(0, 200);
            while (color_difference(color, string_to_color(COLOR_BACKGROUND)) < MIN_COLOR_SIMILARITY);
            color = color_to_string(color);
            var ball = new Ball(position, speed, radius, mass, color);
            ball_arr.push(ball);
        }
    }
    return (ball_arr);
}

function draw_balls(canvas_context, balls) {
    // balls.for_each_ball(function (ball) {
    balls.forEach(function (ball) {
        var canvas_position = convert_position_to_canvas(ball.get_position());
        var radius = ball.get_radius() / scale;
        var color = ball.get_color();

        canvas_context.fillStyle = color;
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

function reset_canvas(canvas_context) {
    canvas_context.clearRect(0, 0, width, height, "white");
}

function draw(canvas_context, balls, simulation_time) {
    reset_canvas(canvas_context);
    draw_balls(canvas_context, balls);
    draw_time(canvas_context, simulation_time);
}



function advance_simulation(time_step, simulation_time, balls){
    advance_balls(balls, time_step);
    simulation_time.t += time_step;
}

var balls;
var id1 = null;
var id2 = null;

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
    addEventListener("keydown", (event) => { keyPressed(event) });
    addEventListener("wheel", (event) => { scale += event.deltaY / 500; if (scale < 1) scale = 1; });
    // document.onkeypress = function (e) { if (window.event) keyPressed(e.keyCode); else if (e.which) keyPressed(e.keyCode); };

    balls = init_balls(10);
    var time_strech = 1;
    var time_step = 0.01;
    var simulation_time = {t: 0};
    id1 = setInterval(draw, 1000 / FPS, canvas_context, balls, simulation_time);
    id2 = setInterval(advance_simulation, time_step * 1000 * time_strech, time_step, simulation_time, balls);

}

function keyPressed(event) {
    switch (event.key) {
        case 'r':
            main();
            break;
        default:
            break;
    }
}
