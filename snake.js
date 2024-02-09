// Snake game variables
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let direction = "right";
let food = generateFood();

// Game loop
function gameLoop() {
  clearCanvas();
  moveSnake();
  drawSnake();
  drawFood();

  if (isCollision()) {
    gameOver();
    return;
  }

  setTimeout(gameLoop, 150);
}

// Event listener for keyboard input
document.addEventListener("keydown", changeDirection);

// Change snake direction based on arrow key input
function changeDirection(event) {
  const key = event.keyCode;
  const leftKey = 37;
  const upKey = 38;
  const rightKey = 39;
  const downKey = 40;

  if (key === leftKey && direction !== "right") {
    direction = "left";
  } else if (key === upKey && direction !== "down") {
    direction = "up";
  } else if (key === rightKey && direction !== "left") {
    direction = "right";
  } else if (key === downKey && direction !== "up") {
    direction = "down";
  }
}

// Generate random food position
function generateFood() {
  const position = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)),
    y: Math.floor(Math.random() * (canvas.height / gridSize))
  };

  return position;
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  if (direction === "right") {
    head.x++;
  } else if (direction === "left") {
    head.x--;
  } else if (direction === "up") {
    head.y--;
  } else if (direction === "down") {
    head.y++;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }
}

// Check for collision with the snake's body or the canvas borders
function isCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x >= canvas.width / gridSize ||
    head.y < 0 ||
    head.y >= canvas.height / gridSize
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Draw the snake
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "#333";
    context.fillRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize,
      gridSize
    );
  }
}

// Draw the food
function drawFood() {
  context.fillStyle = "#f00";
  context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Clear the canvas
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Game over
function gameOver() {
  alert("Game Over");
  snake = [{ x: 10, y: 10 }];
  direction = "right";
  food = generateFood();
}

// Start the game
gameLoop();








  

