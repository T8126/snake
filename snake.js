const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const gridwidth = 10;
const gridheight = 10;

var xoffset = Math.round(canvas.width/2-gridwidth*40/2);
var yoffset = Math.round(canvas.height/2-gridwidth*40/2);

function drawRect(x,y,width,height) {
	ctx.fillRect(x+xoffset,y+yoffset,width,height);
}

window.addEventListener('keydown', (event) => {
	if (event.key == 'ArrowRight' && directionwent != 'left') {
		direction = 'right';
	}
	if (event.key == 'ArrowLeft' && directionwent != 'right') {
		direction = 'left';
	}
	if (event.key == 'ArrowUp' && directionwent != 'down') {
		direction = 'up';
	}	
	if (event.key == 'ArrowDown' && directionwent != 'up') {
		direction = 'down';
	}
});

window.addEventListener('resize', (event) => {
	console.log(xoffset,yoffset);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	xoffset = Math.round(canvas.width/2-gridwidth*40/2);
	yoffset = Math.round(canvas.height/2-gridwidth*40/2);
});

window.addEventListener('click', (event) => {
	if (event.clientX >= canvas.width/2-ctx.measureText("Play Again?").width/2-10 && event.clientX <= canvas.width/2+ctx.measureText("Play Again?").width/2+10 && event.clientY >= yoffset-50 && event.clientY <= yoffset-10 && gameon == false) {
		setup();
	}
});

var Grid = function() {
	this.render = function() {
		for (var y = 0; y < gridheight; y++) {
			for (var x = 0; x < gridwidth; x++) {
				if ((x + (y % 2 + 1)) % 2) {
					ctx.fillStyle = '#94e35b';
				} else {
					ctx.fillStyle = '#9bed5f';
				}
				if (40*x+40 < canvas.width && 40*y+40 < canvas.height) {
					drawRect(40*x,40*y,40,40);
					if (timer%20 == 0) {
						console.log('drawn');
					}
				} else {
					if (timer%20 == 0) {
						console.log('not drawn');
					}
				}
			}
		}
	}
}

var Snake = function() {
	this.snakelist = [[0,0]];
	
	this.dirMoves = { 
		"right":[1,0], 
		"left":[-1,0], 
		"up":[0,-1],
		"down":[0,1]
	};
	
	this.move = function(appleX,appleY) {
		var newpos = [this.snakelist[0][0]+this.dirMoves[direction][0],this.snakelist[0][1]+this.dirMoves[direction][1]];
		if (newpos[0] >= 0 && newpos[0] <= gridwidth-1 && newpos[1] >= 0 && newpos[1] <= gridheight-1 && this.snakelist.join(' ').indexOf(newpos.join())/4 == -0.25) {
			if (direction == 'right') {
				this.snakelist.unshift(newpos);
			}
			if (direction == 'left') {
				this.snakelist.unshift(newpos);
			}
			if (direction == 'up') {
				this.snakelist.unshift(newpos);
			}
			if (direction == 'down') {
				this.snakelist.unshift(newpos);
			}
			if (newpos[0] == appleX && newpos[1] == appleY) {
				appleEaten = true;
			} else {
				this.snakelist.pop();
			}
			directionwent = direction;
		} else {
			gameon = false;
		}
	}
	
	this.render = function() {
		ctx.fillStyle = '#5b98e3';
		for (var snakeindex = 0; snakeindex < this.snakelist.length; snakeindex++) {
			if (this.snakelist.length == 1) {
				drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1]+5,30,30);
			} else {
				if (snakeindex == 0) {
					if ([this.snakelist[snakeindex][0]+1] == this.snakelist[snakeindex+1][0]) {
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1]+5,35,30);
					} else if ([this.snakelist[snakeindex][0]-1] == this.snakelist[snakeindex+1][0]) {
						drawRect(40*this.snakelist[snakeindex][0],40*this.snakelist[snakeindex][1]+5,35,30);
					} else if ([this.snakelist[snakeindex][1]+1] == this.snakelist[snakeindex+1][1]) {
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1]+5,30,35);
					} else if ([this.snakelist[snakeindex][1]-1] == this.snakelist[snakeindex+1][1]) {
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1],30,35);
					} else {
						drawRect(40*this.snakelist[snakeindex][0],40*this.snakelist[snakeindex][1],40,40);
					}
				} else if (snakeindex == this.snakelist.length-1) {
					if ([this.snakelist[snakeindex][0]+1] == this.snakelist[snakeindex-1][0]) {
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1]+5,35,30);
					} else if ([this.snakelist[snakeindex][0]-1] == this.snakelist[snakeindex-1][0]) {
						drawRect(40*this.snakelist[snakeindex][0],40*this.snakelist[snakeindex][1]+5,35,30);
					} else if ([this.snakelist[snakeindex][1]+1] == this.snakelist[snakeindex-1][1]) {
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1]+5,30,35);
					} else if ([this.snakelist[snakeindex][1]-1] == this.snakelist[snakeindex-1][1]) {
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1],30,35);
					} else {
						drawRect(40*this.snakelist[snakeindex][0],40*this.snakelist[snakeindex][1],40,40);
					}
				} else {
					var beforepos = this.snakelist[snakeindex+1];
					var pos = this.snakelist[snakeindex];
					var afterpos = this.snakelist[snakeindex-1];
					var snakepart = ['000',
										  '010',
										  '000'];
					if (beforepos[0] == pos[0] && afterpos[0] == pos[0]) {
						snakepart = ['010',
										 '010',
										 '010'];
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1],30,40);
					}	else if (beforepos[1] == pos[1] && afterpos[1] == pos[1]) {
						snakepart = ['000',
										 '111',
										 '000'];
						drawRect(40*this.snakelist[snakeindex][0],40*this.snakelist[snakeindex][1]+5,40,30);
					} else if ((beforepos[1] < pos[1] && afterpos[0] > pos[0]) || (afterpos[1] < pos[1] && beforepos[0] > pos[0])) {
						snakepart = ['010',
										 '011',
										 '000'];
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1],30,35);
						drawRect(40*this.snakelist[snakeindex][0]+35,40*this.snakelist[snakeindex][1]+5,5,30);
					} else if ((beforepos[1] > pos[1] && afterpos[0] > pos[0]) || (afterpos[1] > pos[1] && beforepos[0] > pos[0])) {
						snakepart = ['000',
										 '011',
										 '010'];
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1]+5,35,30);
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1]+35,30,5);
					} else if ((beforepos[1] > pos[1] && afterpos[0] < pos[0]) || (afterpos[1] > pos[1] && beforepos[0] < pos[0])) {
						snakepart = ['000',
										 '110',
										 '010'];
						drawRect(40*this.snakelist[snakeindex][0],40*this.snakelist[snakeindex][1]+5,35,30);
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1]+35,30,5);
					} else if ((beforepos[1] < pos[1] && afterpos[0] < pos[0]) || (afterpos[1] < pos[1] && beforepos[0] < pos[0])) {
						drawRect(40*this.snakelist[snakeindex][0]+5,40*this.snakelist[snakeindex][1],30,35);
						drawRect(40*this.snakelist[snakeindex][0],40*this.snakelist[snakeindex][1]+5,5,30);
						snakepart = ['010',
										 '110',
										 '000'];
					}
				}
			}
		}
	}
}

var Apple = function() {
	this.x = 5;
	this.y = 5;
	
	this.relocate = function(snakelist) {
		var pos = [this.x,this.y]
		while (snakelist.join(' ').indexOf([this.x,this.y].join())/4 != -0.25) {
			this.x = Math.round(Math.random()*(gridwidth-1));
			this.y = Math.round(Math.random()*(gridheight-1));
			pos = [this.x,this.y];
		}
	}
	
	this.render = function() {
		ctx.fillStyle = '#b52626';
		drawRect(40*this.x+5,40*this.y+5,30,30)
	}
}

function clear() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function setup() {
	direction = 'right';
	directionwent = '';

	appleEaten = false;

	timer = 1;

	gameon = true;
	
	grid = new Grid();
	snake = new Snake();
	apple = new Apple();

	score = 1;
	scorestr = '';
	step();
}

function step() {
	if (gameon) {
		clear();
		if (timer % 20 == 0) {
			snake.move(apple.x,apple.y);
		}
		if (appleEaten) {
			apple.relocate(snake.snakelist);
			appleEaten = false;
			score++;
		}
		ctx.fillStyle = 'white';
		ctx.font = "30px Staatliches";
		scorestr = "Score: "+score.toString();
		ctx.fillText(scorestr,canvas.width/2-ctx.measureText(scorestr).width/2,yoffset-20);
		grid.render();
		snake.render();
		apple.render();
		timer++;
		window.requestAnimationFrame(step);
	} else {
		gameOver();
	}
}

function gameOver() {
	clear();
	grid.render();
	snake.render();
	apple.render();
	ctx.fillStyle = "white";
	ctx.fillRect(canvas.width/2-ctx.measureText("Play Again?").width/2-10,yoffset-50,ctx.measureText("Play Again?").width+20,40);
	ctx.fillText(scorestr,canvas.width/2-ctx.measureText(scorestr).width/2,yoffset-60);
	ctx.fillStyle = "black";
	ctx.fillText("Play Again?",canvas.width/2-ctx.measureText("Play Again?").width/2,yoffset-20);
}

setup();