class BallsV1{
    //object containing balls
    constructor(balls){
        this.balls = balls;
    }

    advance(time_step){
        this.balls.forEach(function (ball) {
            var speed = ball.get_speed()
            var moved = new Vector(speed.x, speed.y);
            moved.mult(time_step);
            // console.log(time_step);
            ball.get_position().add(moved);
            // ball.set_position(ball.get_position().add(ball.set_position));
        })
        
    }

    check_collisions(){
        for(var ball_1 = 0; ball_1 < this.balls.length; ball_1++){
            Ball.check_and_collided_wall(this.balls[ball_1]);
            for(var ball_2 = ball_1+1; ball_2 < this.balls.length; ball_2++){
                //for each pair of balls - O(n^2)
                if(Ball.check_collided(this.balls[ball_1], this.balls[ball_2])){
                    Ball.collide(this.balls[ball_1], this.balls[ball_2])
                }
            }
        }
    }

    for_each_ball(func){
        this.balls.forEach(func);
    }

}
