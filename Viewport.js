class Viewport{
    //everything related to translating position and time to canvas.

}


function convert_canvas_to_position(position) {
    return (new Vector(position.x, position.y));
}

var scale = 5;
function convert_position_to_canvas(position) {
    return (new Vector(position.x / scale + width / 2, height - (position.y / scale + height / 2)));
}
