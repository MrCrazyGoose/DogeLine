// element = document.querySelector(tag)
// context = canvas.getContext("2d")
// element.addEventListener(type, func)
// id = setTimeout(func, delay)
// id = setInterval(func. delay)
// requestAnimationFrame(func)

const SIZE = 30;

// enum
const RIGHT = 1;
const DOWN = 2
const LEFT = 3;
const UP = 4;

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const H = canvas.height / SIZE;  // height in blocks
const W = canvas.width / SIZE;   // width in blocks

let dir = null;

let snake = [];
//doge head
snake.push({x: 5, y: Math.floor(H/2)});
//doge body
snake.push({x: 4, y: Math.floor(H/2)});
snake.push({x: 3, y: Math.floor(H/2)});

let moneys = [];
function spawnCoin() {
	let x = Math.floor(Math.random() * W);
	let y = Math.floor(Math.random() * H);
	for (let piece of snake) {
		if (piece.x === x && piece.y === y) {
			spawnCoin();
			return;  // end this function
		}
	}
	// TODO

	moneys.push({x: x, y: y});
}

function draw() {
	// draw background
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0, 0, 600, 600);

	// draw food TODO

	// draw snake
	ctx.fillStyle = "gold";
	ctx.strokeStyle = "peach";
	for (let piece of snake) {
		ctx.fillRect(piece.x * SIZE, piece.y * SIZE, SIZE, SIZE);
		ctx.strokeRect(piece.x * SIZE, piece.y * SIZE, SIZE, SIZE);
	}

	if (dir !== null) {
		// move body of snake
		for (let i = snake.length - 1; i >= 1; i--) {
			snake[i].x = snake[i - 1].x;
			snake[i].y = snake[i - 1].y;
		}

		// move head snake
		if (dir == RIGHT)
			snake[0].x = snake[0].x + 1;
		else if (dir == LEFT)
			snake[0].x = snake[0].x - 1;
		else if (dir == UP)
			snake[0].y = snake[0].y - 1;
		else if (dir == DOWN)
			snake[0].y = snake[0].y + 1;
	}
	// ...
}
draw();

// controlls
document.addEventListener("keydown", function(event) {
	console.log(event.key);
	if (event.key === "w" || event.key === "W" || event.key === "ArrowUp")
		dir = UP;
	else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft")
		dir = LEFT;
	else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown")
		dir = DOWN;
	else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight")
		dir = RIGHT;
});

// start game
setInterval(draw, 500);

