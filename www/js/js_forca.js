// Array de times
const times = ["flamengo", "palmeiras", "corinthians", "santos", "botafogo"];

// Array de frutas
const fruits = ["maçã", "banana", "laranja", "abacaxi", "uva"];

// Array de objetos
const objects = ["cadeira", "mesa", "sofá", "abajur", "tapete"];

// Array de cores
const colors = ["vermelho", "azul", "amarelo", "verde", "roxo"];

// Array de nomes
const names = ["fernando", "wellignton", "jesus", "micael", "mariana"];

const randomLists = [times, fruits, objects, colors, names];
      const randomListIndex = Math.floor(Math.random() * randomLists.length);
      const randomList = randomLists[randomListIndex];
      const word = randomList[Math.floor(Math.random() * randomList.length)];

      let listName;
      if (randomList === times) {
        listName = "Times";
      } else if (randomList === fruits) {
        listName = "Frutas";
      } else if (randomList === names) {
        listName = "Nomes";
      } else if (randomList === objects) {
        listName = "Objetos";
      } else {
        listName = "Cores";
      }
      const listNameElement = document.getElementById("list-name");
      listNameElement.innerHTML = "Tema: " + listName;

// Converte a palavra em uma array de letras
const wordArray = word.toLowerCase().split("");

// Obtém referências para elementos do HTML
const incorrectElement = document.getElementById("incorrect");
const guessElement = document.getElementById("guess");
const wordElement = document.getElementById("word");
const letterButtonsContainer = document.getElementById("letter-buttons");

// Cria um array vazio para as letras incorretas e corretas
let incorrect = [];
let correct = [];

// Cria um botão para cada letra do alfabeto
for (let i = 97; i <= 122; i++) {
  const letter = String.fromCharCode(i);
  const button = document.createElement("button");
  button.textContent = letter;
  button.addEventListener("click", function() {
  handleGuess(letter);
  });
  letterButtonsContainer.appendChild(button);
}

// Cria uma array de underlines com o mesmo tamanho da palavra escolhida
wordArray.forEach(function() {
correct.push("_");
});

// Exibe a array de underlines na tela
wordElement.innerHTML = correct.join(" ");

// Função chamada ao clicar em um botão de letra
function handleGuess(letter) {
  if (wordArray.indexOf(letter) === -1) { // letra incorreta
  incorrect.push(letter); // adiciona a letra à array de incorretas
  incorrectElement.innerHTML = "Incorretas: " + incorrect.join(" "); // exibe as letras incorretas na tela
} else { // letra correta
  for (let i = 0; i < wordArray.length; i++) {
  if (wordArray[i] === letter) {
  correct[i] = word[i]; // atualiza a array de corretas com a letra correta na posição correta
}
}
wordElement.innerHTML = correct.join(" "); // exibe a nova array de corretas na tela
}

// Verifica se o jogador venceu ou perdeu o jogo
if (correct.join("") === word) { // se a array de corretas for igual à palavra, o jogador venceu
  guessElement.innerHTML = "You Win!";
  guessElement.style.color = "green";
}

if (incorrect.length === 4) { // se a array de incorretas tiver 6 letras, o jogador perdeu
  guessElement.innerHTML = "You Lost";
  guessElement.style.color = "red";
  restartGame(); // reinicia o jogo
  }
}

// Função para reiniciar o jogo
function restartGame() {
  incorrect = [];
  correct = [];
  location.reload(); // recarrega a página
}