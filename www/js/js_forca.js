const word = "flamengo";
const wordArray = word.toLowerCase().split("");
const incorrectElement = document.getElementById("incorrect");
const guessElement = document.getElementById("guess");
const wordElement = document.getElementById("word");
let incorrect = [];
let correct = [];

wordArray.forEach(function() {
  correct.push("_");
});
wordElement.innerHTML = correct.join(" ");

document.getElementById("submit").addEventListener("click", function() {
  const letter = document.getElementById("letter").value.toLowerCase();
  
  if (wordArray.indexOf(letter) === -1) {
    incorrect.push(letter);
    incorrectElement.innerHTML = "Incorrect: " + incorrect.join(" ");
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
})