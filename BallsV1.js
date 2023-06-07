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

function check_collided(ball1, ball2) {
    radii_vector = new Vector(ball1.get_position().x - ball2.get_position().x, ball1.get_position().y - ball2.get_position.y)
    radii_lengths_sum = ball1.get_radius() + ball2.get_radius();
    if (radii_vector.length() <= radii_lengths_sum) return true;
    return false;
}