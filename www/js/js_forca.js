const word = "flamengo";
const wordArray = word.toLowerCase().split("");
const incorrectElement = document.getElementById("incorrect");
const guessElement = document.getElementById("guess");
const wordElement = document.getElementById("word");
const letterButtonsContainer = document.getElementById("letter-buttons");
let incorrect = [];
let correct = [];

// create a button for each letter of the alphabet
for (let i = 97; i <= 122; i++) {
  const letter = String.fromCharCode(i);
  const button = document.createElement("button");
  button.textContent = letter;
  button.addEventListener("click", function() {
    handleGuess(letter);
  });
  letterButtonsContainer.appendChild(button);
}

wordArray.forEach(function() {
  correct.push("_");
});
wordElement.innerHTML = correct.join(" ");

function handleGuess(letter) {
  if (wordArray.indexOf(letter) === -1) {
    incorrect.push(letter);
    incorrectElement.innerHTML = "Incorretas: " + incorrect.join(" ");
  } else {
    for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i] === letter) {
        correct[i] = word[i];
      }
    }
    wordElement.innerHTML = correct.join(" ");
  }
  
  if (correct.join("") === word) {
    guessElement.innerHTML = "You win!";
    guessElement.style.color = "green";
  }
  
  if (incorrect.length === 6) {
    guessElement.innerHTML = "You lose.";
    guessElement.style.color = "red";
  }
}