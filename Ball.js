class Ball {
    /*
    add option to recieve mouse event to grow and shrink ball, ad mouse, change color, and what not.
    even have an event to kill the ball, to which a subscriber (BallsVx) is needed to listen to.
    that way a ball can be shranken out of existence or ctrl+clicked to remove.
    */
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

    static check_collided_old(ball1, ball2) {
        radii_vector = new Vector(ball1.get_position().x - ball2.get_position().x, ball1.get_position().y - ball2.get_position().y)
        radii_lengths_sum = ball1.get_radius() + ball2.get_radius();
        if (radii_vector.length() <= radii_lengths_sum) return true;
        return false;
    }

    static check_and_collided_wall(ball) {
        var p = ball.get_position();
        var flip_x = (p.x < -2000) || (p.x > 2000);
        var flip_y = (p.y < -2000) || (p.y > 2000);
        ball.get_speed().mult(flip_x ? -1 : 1, flip_y ? -1 : 1);
        if(flip_x || flip_y){
            ball.color = color_from_rgb(255,255,255);
        }
    }

    static check_collided(ball_1, ball_2) {
        var radial_vector = new Vector(ball_2.get_position())
        radial_vector.sub(ball_1.get_position())
        return(radial_vector.get_length() <= ball_1.get_radius() + ball_2.get_radius());
    }

    static collide(ball_1, ball_2) {
        // elastic collision equations:
        // https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
        var m1 = ball_1.get_mass();
        var m2 = ball_2.get_mass();
        var v1 = new Vector(ball_1.get_speed());
        v1.sub(ball_2.get_speed());
        var x1 = new Vector(ball_1.get_position());
        x1.sub(ball_2.get_position());
        var length = x1.get_length() ** 2;
        
        x1.mult(2 * v1.scalar_product(x1));
        x1.div(length * (m1 + m2));
        var x2 = new Vector(x1);
        x1.mult(-m2);
        x2.mult(m1);
        ball_1.get_speed().add(x1)
        ball_2.get_speed().add(x2)
    }
}
