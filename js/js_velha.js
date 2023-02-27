const squares = document.querySelectorAll('.square');
let currentPlayer = 'X';
let isGameActive = true;
const resultEl = document.querySelector('#result');
const humanBtn = document.querySelector('#human-btn');
const botBtn = document.querySelector('#bot-btn');
let isAgainstBot = false;
const botPlayer = 'O';

humanBtn.addEventListener('click', function() {
  isAgainstBot = false;
  resetGame();
});

botBtn.addEventListener('click', function() {
  isAgainstBot = true;
  resetGame();
  if (currentPlayer === botPlayer) {
    makeBotMove();
  }
});


for (const square of squares) {
  square.addEventListener('click', function() {
    if (isGameActive && square.textContent === '') {
      square.textContent = currentPlayer;
      checkForWinningMove();
      switchPlayer();
      if (isAgainstBot && currentPlayer === botPlayer) {
        makeBotMove();
      }
    }
  });
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkForWinningMove() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    if (
      squares[combination[0]].textContent === currentPlayer &&
      squares[combination[1]].textContent === currentPlayer &&
      squares[combination[2]].textContent === currentPlayer
    ) {
      resultEl.textContent = `Player ${currentPlayer} wins!`;
      resultEl.style.color = 'green';
      resultEl.style.fontSize = '2rem';
      isGameActive = false;
      return;
    }
  }

  let isDraw = true;
  for (const square of squares) {
    if (square.textContent === '') {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    resultEl.textContent = 'Draw!';
    resultEl.style.color = 'gray';
    resultEl.style.fontSize = '2rem';
    isGameActive = false;
  }
}

function makeBotMove() {
  if (!isGameActive) {
    return;
  }
  let availableSquares = [];
  for (const square of squares) {
    if (square.textContent === '') {
      availableSquares.push(square);
    }
  }
  if (availableSquares.length === 0) {
    return;
  }
  const randomIndex = Math.floor(Math.random() * availableSquares.length);
  availableSquares[randomIndex].textContent = botPlayer;
  checkForWinningMove();
  switchPlayer();
}


function resetGame() {
  for (const square of squares) {
    square.textContent = '';
  }
  currentPlayer = 'X';
  resultEl.textContent = '';
  isGameActive = true;
  if (isAgainstBot && currentPlayer === botPlayer) {
    makeBotMove();
  }
}

