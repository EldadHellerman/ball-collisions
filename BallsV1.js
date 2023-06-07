class BallsV1{
//empty for now

}
function ball_advance(ball, time) {
    speed = ball.get_speed()
    moved = new Vector(speed.x, speed.y);
    moved.mult(time);
    ball.get_position().add(moved);
    // ball.set_position(ball.get_position().add(ball.set_position));
}

function advance_balls(balls, time_step) {
    balls.forEach(function (ball) { ball_advance(ball, time_step); })
}