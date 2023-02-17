// Obtém o elemento do canvas e o contexto 2D
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// Obtém o elemento do display de pontuação
const scoreDisplay = document.getElementById("score");

// Define o tamanho da grade e o número de tiles no canvas
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Variáveis para armazenar a cobra, a maçã e a pontuação
let snake = [{x: 10, y: 10}];
let apple = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
let nextDx = 0;
let nextDy = 0;
let gameLoopId;
let isButtonPressed = false;


const appleImage = document.getElementById("apple-image");
appleImage.width = gridSize;
appleImage.height = gridSize;

// Obtém o recorde salvo no localStorage ou define como 0 se ainda não existir
let highScore = localStorage.getItem("snakeHighScore") || 0;

// Obtém o elemento HTML que exibe o recorde
const highScoreDisplay = document.querySelector("#high-score");

// Exibe o recorde inicial
highScoreDisplay.textContent = "Recorde: " + highScore;

function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.beginPath();

    // Define o desenho da cabeça da cobra como um losango
    if (index === 0) {
      ctx.moveTo(segment.x * gridSize, segment.y * gridSize + gridSize / 2);
      ctx.lineTo(segment.x * gridSize + gridSize / 2, segment.y * gridSize);
      ctx.lineTo(segment.x * gridSize + gridSize, segment.y * gridSize + gridSize / 2);
      ctx.lineTo(segment.x * gridSize + gridSize / 2, segment.y * gridSize + gridSize);
    } else { // Define o desenho do corpo da cobra como bolinhas
      ctx.arc((segment.x * gridSize) + (gridSize / 2), (segment.y * gridSize) + (gridSize / 2), gridSize / 2, 0, Math.PI * 2);
    }

    ctx.fill();
  });
}

function changeColors() {
  if (isButtonPressed) {
    // Restaura as cores padrão
    document.body.style.backgroundColor = "#efe001";
    document.getElementById("canvas").style.backgroundColor = "#efe001";
    document.getElementById("score").style.color = "black";
    document.getElementById("high-score").style.color = "black";
    ctx.fillStyle = "#000000";
  } else {
    // Define as cores alteradas
    document.body.style.backgroundColor = "black";
    document.getElementById("canvas").style.backgroundColor = "black";
    document.getElementById("score").style.color = "white";
    document.getElementById("high-score").style.color = "white";
    ctx.fillStyle = "yellow";
  }

  drawSnake();

  // Inverte o valor de isButtonPressed
  isButtonPressed = !isButtonPressed;
}



function drawApple() {
  ctx.drawImage(appleImage, apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

// Função para mover a cobra
function moveSnake() {
  // Atualiza a direção da cobra
  dx = nextDx;
  dy = nextDy;

  // Verifica se a cobra está tentando se mover na direção oposta da sua direção atual
  if (dx === -snake[0].dx || dy === -snake[0].dy) {
    dx = snake[0].dx;
    dy = snake[0].dy;
  }

  // Define a cabeça da cobra como a primeira posição + dx e dy
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};

  // Verifica se a cabeça da cobra está fora dos limites da grade
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {

    const message = `Game over! Your score was ${score}.`;
    const gameOverDiv = document.getElementById("game-over");
    gameOverDiv.innerHTML = message;
    gameOverDiv.style.display = "block";
    clearInterval(gameLoopId);
    setTimeout(() => {
      gameOverDiv.style.display = "none";
      resetGame();
    }, 500);

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("snakeHighScore", highScore);
      highScoreDisplay.textContent = "Recorde: " + highScore;
    }
    
  }
  // Adiciona a nova posição da cabeça da cobra
  snake.unshift(head);
  // Verifica se a cobra colidiu com uma maçã
  if (head.x === apple.x && head.y === apple.y) {
    // Se a cobra colidiu, aumenta a pontuação, gera uma nova maçã e atualiza o display de pontuação
    score += 1;
    scoreDisplay.textContent = "Pontos: " + score;
    generateApple();
  } else {
    // Se a cobra não colidiu, remove a última posição do seu corpo
    snake.pop();
  }
  
  // Verifica se a cabeça da cobra colidiu com alguma parte do seu corpo
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      const message = `Game over! Your score was ${score}.`;
      const gameOverDiv = document.getElementById("game-over");
      gameOverDiv.innerHTML = message;
      gameOverDiv.style.display = "block";
      clearInterval(gameLoopId);
      setTimeout(() => {
        gameOverDiv.style.display = "none";
        resetGame();
      }, 500);

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", highScore);
        highScoreDisplay.textContent = "Recorde: " + highScore;
      }

    }
  }

}


// Função para gerar uma nova maçã em uma posição aleatória na grade
function generateApple() {
  apple = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
  // Garante que a maçã não apareça em uma posição que já esteja ocupada pela cobra
  if (snake.some(segment => segment.x === apple.x && segment.y === apple.y)) {
    generateApple();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  drawSnake();
  drawApple();

  const button = document.getElementById("button");
  button.addEventListener("click", changeColors);

  setTimeout(gameLoop, 100);
}

// Define as teclas que controlam a direção da cobra
function setDirection(event) {
    switch (event.key) {
      case "ArrowLeft":
        if (dx !== 1) {
          nextDx = -1;
          nextDy = 0;
        }
        break;
      case "ArrowRight":
        if (dx !== -1) {
          nextDx = 1;
          nextDy = 0;
        }
        break;
      case "ArrowUp":
        if (dy !== 1) {
          nextDx = 0;
          nextDy = -1;
        }
        break;
      case "ArrowDown":
        if (dy !== -1) {
          nextDx = 0;
          nextDy = 1;
        }
        break;
    }
};  


function resetGame() {
  snake = [{x: 10, y: 10}];
  apple = {x: 15, y: 15};
  dx = 0;
  dy = 0;
  nextDx = 0;
  nextDy = 0;
  score = 0;
  scoreDisplay.textContent = "Pontos: " + score;


}

document.addEventListener("keydown", setDirection);

// Inicia o jogo
generateApple();
canvas.setAttribute("tabindex", 0);
canvas.focus();
gameLoop();