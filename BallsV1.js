class BallsV1{
    //object containing balls
    constructor(balls){
        this.balls = balls;
        // this.location_map_create();
    }
    //
    location_map_create(size=20){
        //divide 4,000*4,000 grid into (4000/size)*(4000/size) cells.
        //in case of size 20, 100*100 cells
        this.location_table_size = size;
        this.cell_size = 4000 / this.location_table_size;
        this.location_table = new Array(size);
        for(let y = 0; y < size; y++){
            this.location_table[y] = new Array(size);
            for(let x = 0; x < size; x++){
                this.location_table[y][x] = new Set();
            }
        }
        this.balls.forEach(function(ball){ this.location_map_ball_add(ball); }, this)
    }
    
    print_location_table(){
        let s = "";
        for(let y = this.location_table_size-1; y >= 0 ; y--){
            s += '[';
            for(let x = 0; x < this.location_table_size; x++){
                s += this.location_table[y][x].size + ",";
            }
            s += ']\n';
        }
        console.log(s);
    }

    location_map_coordinate_to_cell(x, y){
        x += 2000;
        y += 2000;
        let cell_x = Math.floor(x / this.cell_size);
        let cell_y = Math.floor(y / this.cell_size);
        return {x: cell_x, y: cell_y};
    }

    location_map_add_ball_single_cell(ball, cell){
        this.location_table[cell.y][cell.x].add(ball);
    }

    location_map_remove_ball_single_cell(ball, cell){
        this.location_table[cell.y][cell.x].delete(ball);
    }
    
    location_map_get_possibly_occupied_cells(ball){
        //get all surrounding cells up to ball diameter,
        //meaning, every cell the ball may have a part of itself in.
        // console.log("ball radius is", ball.get_radius(), "cell size is:", this.cell_size);
        let offset = 1 + Math.floor(ball.get_radius() / this.cell_size);
        let cell = this.location_map_coordinate_to_cell(ball.get_position().x, ball.get_position().y);
        // console.log("offset is", offset, "cell is:", cell.x, cell.y);
        let r = new Set();
        for(let y=cell.y-offset; y<=cell.y+offset; y++){
            for(let x=cell.x-offset; x<=cell.x+offset; x++){
                if( (0 <= x) && (x < this.location_table_size) &&
                    (0 <= y) && (y < this.location_table_size)){
                    r.add({x, y});
                }
            }
        }
        return r;
    }

    location_map_ball_add(ball){
        //add ball to all surrounding cells up to ball diameter:
        // let f = this.location_map_add_ball_single_cell;
        // console.log("adding ball", ball, cells)
        let cells = this.location_map_get_possibly_occupied_cells(ball);
        cells.forEach(function(cell){
            this.location_map_add_ball_single_cell(ball, cell);
        }, this);
    }
    
    location_map_ball_remove(ball){
        //remove ball from all surrounding cells up to ball diameter:
        let cells = this.location_map_get_possibly_occupied_cells(ball);
        cells.forEach(function(cell){
            this.location_map_remove_ball_single_cell(ball, cell);
        }, this);
    }
    
    location_map_get_balls_close_by(ball){
        //get all balls occupying the same cells as this ball
        //these are all the balls that are needed to be checked for possibile collisions
        let r = new Set();
        this.location_map_get_possibly_occupied_cells(ball).forEach(function(cell){
            this.location_table[cell.y][cell.x].forEach(function(cell_ball){
                r.add(cell_ball);
            });
        }, this);
        r.delete(ball); //dont return ball itself.
        return r;
    }
    
    advance(time_step){
        // this.print_location_table();
        this.balls.forEach(function (ball) {
            // this.location_map_ball_remove(ball); //updating location map
            //faster: update location map only if ball center moved to another cell.

            let speed = ball.get_speed()
            let moved = new Vector(speed.x, speed.y);
            moved.mult(time_step);
            // console.log(time_step);
            ball.get_position().add(moved);
            // ball.set_position(ball.get_position().add(ball.set_position));
            this.location_map_ball_add(ball); //updating location map
        }, this)
    }

    check_collisions(){
        for(let ball_1 = 0; ball_1 < this.balls.length; ball_1++){
            Ball.check_and_collided_wall(this.balls[ball_1]);
            for(let ball_2 = ball_1+1; ball_2 < this.balls.length; ball_2++){
                //for each pair of balls - O(n^2)
                if(Ball.check_collided(this.balls[ball_1], this.balls[ball_2])){
                    Ball.collide(this.balls[ball_1], this.balls[ball_2])
                }
            }
        }
    }

    check_collisions_using_location_table(){
        //collision will occur twice!
        //need to set some sort of flags for balls which have been calculated this round
        //this will intoruce further problems with 3 balls colliding simultanously..
        //can just create location map everytime since it's O(n),
        //obiously updating the previous one will be faster.
        this.balls.forEach(function(ball_1){
            this.location_map_ball_remove(ball_1);
            Ball.check_and_collided_wall(ball_1);
            let balls_2 = this.location_map_get_balls_close_by(ball_1);
            balls_2.forEach(function(ball_2){
                if(Ball.check_collided(ball_1, ball_2)){ Ball.collide(ball_1, ball_2); }
            });
        },this);
        // this.print_location_table();
    }

    for_each_ball(func){
        this.balls.forEach(func);
    }

}
