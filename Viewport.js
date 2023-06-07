class Viewport{
    //everything related to translating position to canvas.
    //  set physical dimensions, possibly without limits
    //  set screen dimensions, onto which world is mapped
    //  recieve mouse events to move and zoom the viewport
}


function convert_canvas_to_position(position) {
    return (new Vector(position.x, position.y));
}

var scale = 5;
function convert_position_to_canvas(position) {
    return (new Vector(position.x / scale + width / 2, height - (position.y / scale + height / 2)));
}
