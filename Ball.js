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

    static check_collided(ball1, ball2) {
        var radial_vector = new Vector(ball2.get_position())
        radial_vector.sub(ball1.get_position())
        return(radial_vector.get_length() <= ball1.get_radius() + ball2.get_radius());
    }

    static collide(ball_1, ball_2) {
        var tmp = ball_1.color
        ball_1.color = ball_2.color;
        ball_2.color = tmp;
    }
}
