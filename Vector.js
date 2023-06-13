class Vector {
    
    constructor(x, y) {
        if (arguments.length === 1) {
            this.x = x.x;
            this.y = x.y;
        }else{
            this.x = x;
            this.y = y;
        }
    }

    mult(scalar_1, scalar_2) {
        if(arguments.length === 1){
            this.x *= scalar_1;
            this.y *= scalar_1;
        }else{
            this.x *= scalar_1;
            this.y *= scalar_2;
        }
    }
    
    scalar_product(vec){
        return((this.x * vec.x) + (this.y * vec.y))
    }

    div(scalar){
        this.mult(1/scalar);
    }

    add(vector) {
        // vector addition
        this.x += vector.x;
        this.y += vector.y;
    }
    
    sub(vector) {
        // vector subtraction
        this.x -= vector.x;
        this.y -= vector.y;
    }

    get_length(){
        return (Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2)));
    }
    //can be used for different functions depending on parameters:
    // if (arguments.length === 1) {
    //     s = h.s, v = h.v, h = h.h;
    // }
}