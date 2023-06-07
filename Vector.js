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
    get_length(){
        return ((x**2+y**2)**0.5)
    }
    //can be used for different functions depending on parameters:
    // if (arguments.length === 1) {
    //     s = h.s, v = h.v, h = h.h;
    // }
}