const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

// Tamanho da grade e contagem de tiles no canvas
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Variáveis para armazenar a cobra, a maçã e a pontuação
let snake = [{x: 10, y: 10}];
let apple = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;

// Função para desenhar a cobra no canvas
function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = "#333";
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

// Função para desenhar a maçã no canvas
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
  // Verifica se a cobra está tentando se mover na direção oposta da sua direção atual
  if (dx === -snake[0].dx || dy === -snake[0].dy) {
    dx = snake[0].dx;
    dy = snake[0].dy;
  }
  // Cabeça da cobra é definida como sua primeira posição mais dx e dy
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  // Verifica se a cabeça da cobra está fora dos limites da grade
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    // Se a cobra estiver fora dos limites, reinicia o jogo
    alert("Game over! Your score was " + score + ".");
    location.reload();
  }
  snake.unshift(head);
  // Se a cabeça da cobra encontrar uma maçã, aumenta a pontuação e gera uma nova maçã
  if (head.x === apple.x && head.y === apple.y) {
    score += 1;
    scoreDisplay.textContent = "Pontos: " + score;
    generateApple();
  } else {
    snake.pop();
  }
  
  // Verifica se a cabeça da cobra colidiu com alguma parte do seu corpo
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      alert("Game over! Your score was " + score + ".");
      location.reload();
    }
  }

  // Verifica se a cabeça da cobra colidiu com alguma parte do seu corpo
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      alert("Game over! Your score was " + score + ".");
      location.reload(); // reinicia a página
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
  // Limpa o canvas para redesenhar tudo na nova posição
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveSnake();
  drawApple();
  drawSnake();

  // Verifica se a cobra colidiu com uma parede ou com seu próprio corpo
  if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount || snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)) {
    // Se a cobra colidiu, reinicia o jogo
    alert("Game over! Your score was " + score + ".");
    location.reload();
  }
  if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount || snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)) {
    // Se a cobra colidiu, exibe o alerta e reinicia a página
    alert("Game over! Your score was " + score + ".");
    location.reload(); // reinicia a página
  }
  // Chama a função novamente no próximo quadro
  requestAnimationFrame(gameLoop)
}

// Função para gerar uma nova maçã em uma posição aleatória
function generateApple() {
  apple = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
  // Verifica se a maçã não apareceu em cima da cobra e gera outra maçã caso contrário
  if (snake.some(segment => segment.x === apple.x && segment.y === apple.y)) {
    generateApple();
  }
  
}

// Função para atualizar o jogo a cada quadro
function gameLoop() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Move a cobra
  moveSnake();
  // Desenha a cobra e a maçã
  drawSnake();
  drawApple();
  // Aguarda 100ms antes de chamar novamente a função
  setTimeout(gameLoop, 100);
}

// Define as teclas que controlam a direção da cobra
function setDirection(event) {
  if (event.type === "keydown") {
    if (event.code === "ArrowUp") {
      dx = 0;
      dy = -1;
    }
    if (event.code === "ArrowDown") {
      dx = 0;
      dy = 1;
    }
    if (event.code === "ArrowLeft") {
      dx = -1;
      dy = 0;
    }
    if (event.code === "ArrowRight") {
      dx = 1;
      dy = 0;
    }
  }
}
document.addEventListener("keydown", setDirection);
// Inicia o jogo
generateApple();
canvas.setAttribute("tabindex", 0);
canvas.focus();
gameLoop();