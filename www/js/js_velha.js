const squares = document.querySelectorAll('.square');
let currentPlayer = 'X';
let isGameActive = true;
const resultEl = document.querySelector('#result');
const resetBtn = document.querySelector('#reset-btn');

for (const square of squares) {
  square.addEventListener('click', function() {
    if (isGameActive && square.textContent === '') {
      square.textContent = currentPlayer;
      checkForWinningMove();
      switchPlayer();
    }
  });
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkForWinningMove() {
  const winningCombinations = [    [0, 1, 2],
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
    isGameActive = false;
  }
}

function resetGame() {
  for (const square of squares) {
    square.textContent = '';
  }
  currentPlayer = 'X';
  resultEl.textContent = '';
  isGameActive = true;
}

resetBtn.addEventListener('click', resetGame);
