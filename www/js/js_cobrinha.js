const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{x: 10, y: 10}];
let apple = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;

function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = "#333";
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    scoreDisplay.textContent = "Pontuação: " + score;
    generateApple();
  } else {
    snake.pop();
  }
}

function generateApple() {
  apple.x = Math.floor(Math.random() * tileCount);
  apple.y = Math.floor(Math.random() * tileCount);
  snake.forEach(segment => {
    if (segment.x === apple.x && segment.y === apple.y) {
      generateApple();
    }
  });
}

function checkCollision() {
  if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}

function main() {
  if (checkCollision()) {
    alert("Fim de jogo!");
    location.reload();
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawApple();
  moveSnake();
  setTimeout(main, 100);
}

document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 37:
      dx = -1;
      dy = 0;
      break;
    case 38:
      dx = 0;
      dy = -1;
      break;
    case 39:
      dx = 1;
      dy = 0;
      break;
    case 40:
      dx = 0;
      dy = 1;
      break;
  }
});

generateApple();
main();