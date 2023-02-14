// Define uma array de palavras
const words = ["flamengo", "palmeiras", "corinthians", "santos", "botafogo"];

// Escolhe uma palavra aleatória da lista
const randomIndex = Math.floor(Math.random() * words.length);
const word = words[randomIndex];

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
guessElement.innerHTML = "Você ganhou!";
guessElement.style.color = "green";
}

if (incorrect.length === 6) { // se a array de incorretas tiver 6 letras, o jogador perdeu
guessElement.innerHTML = "Você perdeu.";
guessElement.style.color = "red";
}
}