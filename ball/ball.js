SPEED = 15;
R = 300;
STEP = 15;
SLOW = STEP / (10 * 1000);

var w, h, c, ctx;
var balls = [];

$(document).ready(function(){
	c = document.getElementById("c");
	// Resize canvas
	c.width = $(window).width();
	c.height = $(window).height();

	w = c.width;
	h = c.height;

	ctx = c.getContext("2d");
	ctx.fillStyle = "#1E64CD";

	reset();

	// Click manager
	$("#c").click(function(e){
		var ball = checkClick(e.pageX, e.pageY);
		// If hit
		if (ball) {
			var index = balls.indexOf(ball);
			balls.splice(index, 1);

			// Info for new balls

			// Coordinates for the first ball
			var x1 = ball.r * Math.random() / 2;
			if (Math.random > 0.5) {
				x1 *= -1;
			}
			var y1 = Math.sqrt(Math.pow(ball.r / 2, 2) - Math.pow(x1, 2));
			console.log(x1 + ", " + y1);
			// Coordinates for the second ball
			var x2 = x1 * -1;
			var y2 = y1 * -1;
			// Direction for the first ball
			var dx = Math.random();
			var dy = 1 - dx;
			if (Math.random() < 0.5) {
				dx *= -1;
			}
			var d1 = [dx, dy];
			// Direction for the second ball
			dx = Math.random();
			dy = (1 - dx) * -1;
			if (Math.random() < 0.5) {
				dx *= -1;
			}
			var d2 = [dx, dy];

			// Create balls
			balls.push(new Ball(ball.x + x1, ball.y + y1 + 10, ball.r/2, d1));
			balls.push(new Ball(ball.x + x2, ball.y + y2 - 10, ball.r/2, d2));
		}
	});

	// Loop
	setInterval(function(){
		ctx.clearRect(0, 0, w, h);
		for (var ii = 0; ii < balls.length; ii++) {
			// Check collision with the edges
			// Sides
			if (balls[ii].x - balls[ii].r <= 0 || balls[ii].x + balls[ii].r >= w) {
				balls[ii].dir[0] *= -1;
			}
			// Top & bottom
			else if (balls[ii].y - balls[ii].r <= 0 || balls[ii].y + balls[ii].r >= h) {
				balls[ii].dir[1] *= -1;
			}

			// Move ball
			balls[ii].x += SPEED * balls[ii].dir[0] * balls[ii].s;
			balls[ii].y += SPEED * balls[ii].dir[1] * balls[ii].s;

			// Prevent getting stuck
			// Left
			if (balls[ii].x <= 0) {
				balls[ii].x = 1;
			}
			// Right
			if (balls[ii].x >= w) {
				balls[ii].x = w - 1;
			}
			// Top
			if (balls[ii].y <= 0) {
				balls[ii].y = 1;
			}
			// Bottom
			if (balls[ii].y >= h) {
				balls[ii].y = h - 1;
			}

			// Decrease speed
			if (balls[ii].s != 0) {
				balls[ii].s -= SLOW;
			}
			if (balls[ii].s < 0) {
				balls[ii].s = 0;
			}
			// Draw
			balls[ii].draw();
		}
	}, STEP);
});

// Functions ---------------------------

function reset(){
	balls = [];
	balls.push(new Ball(w/2, h/2, R, [0, 0]));
	ctx.clearRect(0, 0, w, h);
	balls[0].draw();
}

function Ball(x, y, r, dir){
	this.x = x;
	this.y = y;
	this.r = r;
	this.dir = dir;
	this.s = 1;
	this.draw = function(){
		drawCircle(this.x, this.y, this.r);
	}
}

function checkClick(x, y){
	for (ii = 0; ii < balls.length; ii++) {
		var dist = Math.sqrt(Math.pow(balls[ii].x - x, 2) + Math.pow(balls[ii].y - y, 2));
		if (dist < balls[ii].r) {
			return balls[ii];
		}
	}
	return false;
}

function checkCollision(x, y, r) {
	for (ii = 0; ii < balls.length; ii++) {
		// Check for self
		if (x != balls[ii].x || y != balls[ii].y) {
			var dist = Math.sqrt(Math.pow(x - balls[ii].x, 2) + Math.pow(y - balls[ii].y, 2));
			if (dist < r + balls[ii].r) {
				return balls[ii];
			}
		}
	}
	return false;
}

function drawCircle(x, y, r) {
	ctx.beginPath();
	ctx.arc(Math.ceil(x), Math.round(y), Math.round(r), 0, 2 * Math.PI);
	ctx.fill();
	ctx.closePath();
}
