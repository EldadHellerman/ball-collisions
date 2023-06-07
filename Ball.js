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
