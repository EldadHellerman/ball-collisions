
function color(red, green, blue) {
    return ({
        r: red,
        g: green,
        b: blue
    });
}

function string_to_color(color_string) {
    return ({
        r: parseInt(color_string.slice(1, 3), 16),
        g: parseInt(color_string.slice(3, 5), 16),
        b: parseInt(color_string.slice(5, 7), 16)
    });
}

function color_to_string(color) {
    return ("#" + ("0" + color.r.toString(16)).slice(-2)
        + ("0" + color.g.toString(16)).slice(-2)
        + ("0" + color.b.toString(16)).slice(-2));
}

function random_color(min, max) {
    return color(random(min, max), random(min, max), random(min, max));
}

function color_difference(color_1, color_2) {
    var dr = Math.pow(color_1.r - color_2.r,2);
    var dg = Math.pow(color_1.g - color_2.g,2);
    var db = Math.pow(color_1.b - color_2.b,2);
    return Math.sqrt(dr + dg + db);
}