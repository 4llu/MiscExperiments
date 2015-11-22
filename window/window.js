var SIDE = 250;
var w, h;
var sq, l;
var ox, oy, mx, my;
var dragging;
var lt;

$(document).ready(function(){
	// definitions
	w = $(window).width();
	h = $(window).height();
	light_gradient = $("#light-gradient");
	sq = $("#window");
	l = $("#light");
	lt = [w/2, h + 150];

	// Window setup
	sq.attr("width", SIDE);
	sq.attr("height", SIDE);
	sq.attr("x", 100);
	sq.attr("y", 100);

	l.attr("points", light_points());

	// Track mouse position
	$(document).mousemove(function(event){
		mx = event.pageX;
		my = event.pageY;
	});
	// Start dragging
	sq.mousedown(function(){
		drag = true;
		ox = mx - sq.attr("x");
		oy = my - sq.attr("y");
		dragging = setInterval(function(){
			sq.attr("x", mx - ox);
			sq.attr("y", my - oy);
			l.attr("points", light_points());
		}, 1);
	});

	// Stop dragging
	sq.mouseup(function(){
		clearInterval(dragging);
	});
});

var light_points = function(){
	var x = parseInt(sq.attr("x"));
	var y = parseInt(sq.attr("y"));
	var x2 = x + SIDE;
	var y2 = y + SIDE;

	var sqc = [x + SIDE/2, y + SIDE/2];
	var dist = [(lt[0] - sqc[0]), (lt[1] - sqc[1])];

	console.log("," + (y2 + dist[1]));
	// Left side of screen
	if (x + SIDE/2 < w/2) {
		light_gradient.attr("x1", "0%");
		light_gradient.attr("y1", "0%");
		light_gradient.attr("x2", "0%");
		light_gradient.attr("y2", "100%");

		var target_left = (x + dist[0]) + "," + (y2 + dist[1]);
		var target_right = (x2 + dist[0]) + "," + (y + dist[1]);
		var le = target_left + " " + target_right;

		var bottom_left = x + "," + y2;
		var right_top = x2 + "," + y;
		var ls = right_top + " " + bottom_left;
	}
	// Right side of screen
	else {
		light_gradient.attr("x1", "0%");
		light_gradient.attr("y1", "0%");
		light_gradient.attr("x2", "0%");
		light_gradient.attr("y2", "100%");

		var target_left = (x2 + dist[0]) + "," + (y2 + dist[1]);
		var target_right = (x + dist[0]) + "," + (y + dist[1]);
		var le = target_right + " " + target_left;

		var bottom_right = x2 + "," + y2;
		var left_top = x + "," + y;
		var ls = bottom_right + " " + left_top;
	}
	console.log(ls + " " + le);
	return (ls + " " + le);
}
