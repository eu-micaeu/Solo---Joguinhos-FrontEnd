// Define variáveis globais para o tempo de início e fim
var startTime, endTime;

// Define uma variável global para verificar se o jogo foi iniciado ou não
var isStarted = false;

// Adiciona um event listener ao botão de início do jogo
document.getElementById("start-button").addEventListener("click", function() {
  startGame();
});

// Adiciona um event listener ao círculo que aparece no jogo
document.getElementById("circle").addEventListener("click", function() {
  endGame();
});

// Define uma função para iniciar o jogo
function startGame() {
  // Define a variável isStarted como verdadeira
  isStarted = true;
  // Esconde o botão de início e as instruções
  document.getElementById("start-button").style.display = "none";
  document.getElementById("instruction").style.display = "none";
  // Mostra o círculo e define sua cor como vermelha
  document.getElementById("circle").style.display = "block";
  document.getElementById("circle").style.backgroundColor = "red";
  // Define um tempo aleatório para mudar a cor do círculo para verde e registrar o tempo de início
  setTimeout(function() {
    document.getElementById("circle").style.backgroundColor = "green";
    startTime = new Date();
  }, Math.random() * 2000 + 1000);
}

// Define uma função para encerrar o jogo
function endGame() {
  // Se o jogo não tiver sido iniciado, sai da função
  if (!isStarted) {
    return;
  }
  // Se o círculo estiver verde, registra o tempo de reação do jogador
  if (document.getElementById("circle").style.backgroundColor === "green") {
    endTime = new Date();
    var reactionTime = (endTime - startTime) / 1000;
    document.getElementById("result").innerHTML = "Seu tempo foi de " + reactionTime + " segundos.";
  // Se o círculo não estiver verde, exibe uma mensagem de erro
  } else {
    document.getElementById("result").innerHTML = "Muito veloz!";
  }
  // Define o tempo de início como nulo e esconde o círculo e exibe o botão de início e as instruções
  startTime = null;
  document.getElementById("circle").style.display = "none";
  document.getElementById("start-button").style.display = "block";
  document.getElementById("instruction").style.display = "block";
  // Define a variável isStarted como falsa
  isStarted = false;
}
