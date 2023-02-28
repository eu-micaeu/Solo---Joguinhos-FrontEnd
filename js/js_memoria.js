// Array com as cartas do jogo
const cardsArray = [
	{ id: 1, value: 'A' },
	{ id: 2, value: 'B' },
	{ id: 3, value: 'C' },
	{ id: 4, value: 'D' },
	{ id: 5, value: 'E' },
	{ id: 6, value: 'F' },
	{ id: 7, value: 'A' },
	{ id: 8, value: 'B' },
	{ id: 9, value: 'C' },
	{ id: 10, value: 'D' },
	{ id: 11, value: 'E' },
    { id: 12, value: 'F' },
    { id: 11, value: 'G' },
    { id: 12, value: 'G' },
    { id: 11, value: 'H' },
    { id: 12, value: 'H' },
    { id: 11, value: 'I' },
    { id: 12, value: 'I' },
    { id: 11, value: 'J' },
	{ id: 12, value: 'J' }
];

// Embaralha as cartas
function shuffleCards(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Cria o grid de cartas
function createGameGrid() {
    const gameContainer = document.querySelector('.game-grid');
    shuffleCards(cardsArray);
    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.cardId = cardsArray[i].id;
        card.dataset.cardValue = cardsArray[i].value;

        // Cria o elemento span com o valor da carta e adiciona a classe "hidden"
        const cardValue = document.createElement('span');
        cardValue.classList.add('card-value', 'hidden');
        cardValue.textContent = cardsArray[i].value;
        card.appendChild(cardValue);

        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    }
}


// Inicia o jogo
function startGame() {
    createGameGrid();
    setTimeout(() => {
		const cards = document.querySelectorAll('.card');

    }, 1000);
}

function flipCard(event) {
    const card = event.target;
    const flippedCards = document.querySelectorAll('.flipped:not(.correct)');

    // Verifica se a carta pode ser virada
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('correct') && !card.classList.contains('incorrect')) {
        // Adiciona a classe flipped somente após o primeiro clique, exibindo o conteúdo da carta
        card.classList.add('flipped');
        // Mostra a letra da carta
        card.querySelector('.card-value').classList.add('visible');

        const flippedCards = document.querySelectorAll('.flipped:not(.correct)');
        if (flippedCards.length === 2) {
            const card1 = flippedCards[0];
            const card2 = flippedCards[1];
            const card1Value = card1.dataset.cardValue;
            const card2Value = card2.dataset.cardValue;

            // Verifica se as cartas são iguais
            if (card1Value === card2Value) {
                card1.classList.add('correct');
                card2.classList.add('correct');
            } else {
                card1.classList.add('incorrect');
                card2.classList.add('incorrect');
                setTimeout(() => {
                    card1.classList.remove('flipped', 'incorrect');
                    card2.classList.remove('flipped', 'incorrect');
                    // Esconde a letra das cartas viradas incorretamente
                    card1.querySelector('.card-value').classList.remove('visible');
                    card2.querySelector('.card-value').classList.remove('visible');
                }, 1000);
            }
            checkIfWon(); // Adiciona a chamada para a função checkIfWon aqui
        }
    }
}



function resetGame() {
	// Remove todas as cartas do grid
	const gameContainer = document.querySelector('.game-grid');
	while (gameContainer.firstChild) {
		gameContainer.removeChild(gameContainer.firstChild);
	}
	// Cria um novo grid de cartas
	createGameGrid();
	setTimeout(() => {
		const cards = document.querySelectorAll('.card');
		cards.forEach(card => {
			card.classList.add('flipped');
		});
		setTimeout(() => {
			cards.forEach(card => {
				card.classList.remove('flipped');
			});
		}, 0001);
	}, 0001);
}


function checkIfWon() {
    const cards = document.querySelectorAll('.card');
    let allCorrect = true;
    cards.forEach(card => {
        if (!card.classList.contains('correct')) {
            allCorrect = false;
        }
    });
    if (allCorrect) {
        const message = document.createElement('div');
        message.textContent = 'Você ganhou!';
        message.classList.add('win-message');
        document.body.appendChild(message);
        setTimeout(() => {
            message.remove();
            resetGame();
        }, 5000);
    }
}



// Inicia o jogo ao carregar a página
window.addEventListener('load', startGame);