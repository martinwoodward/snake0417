// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Set up the snake
let snake = [{ x: 10, y: 10 }];
let direction = "right";

// Set up the food
let food = { x: Math.floor(Math.random() * canvasWidth), y: Math.floor(Math.random() * canvasHeight) };

// Set up the game loop
function gameLoop() {
  // Move the snake
  let head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    food = { x: Math.floor(Math.random() * canvasWidth), y: Math.floor(Math.random() * canvasHeight) };
  } else {
    snake.pop();
  }

  // Check for collision with walls
  if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) {
    clearInterval(intervalId);
    alert("Game over!");
  }

  // Check for collision with self
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(intervalId);
      alert("Game over!");
    }
  }

  // Draw the game
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
  }
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

let intervalId = setInterval(gameLoop, 100);

// Set up keyboard controls
document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 37:
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 38:
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 39:
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case 40:
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
});
