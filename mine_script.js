// Variables Declaration
let tickBoxes = [
    document.getElementById('b1'),
    document.getElementById('b2'),
    document.getElementById('b3'),
    document.getElementById('b4'),
    document.getElementById('b5'),
    document.getElementById('b6'),
    document.getElementById('b7'),
    document.getElementById('b8'),
    document.getElementById('b9')
];

let winningStreaks = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

let player1Text = 'X';
let player2Text = 'O';
let numberPlayers = 0;

const playBtn = document.getElementById('play-btn');
const onePlayerSelection = document.getElementById('one-player');
const twoPlayersSelection = document.getElementById('two-players');
const xCharacter = document.getElementById('x-character');
const yCharacter = document.getElementById('y-character');

// Initialize scores
let playerScore = 0;
let computerScore = 0;

const scoreBoard = document.getElementById('score-board');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');

// Functions Declaration

// Start the game
const startPlay = () => {
    document.getElementById('greetings-text').innerText = 'How many players do you want in the game?';
    playBtn.style.display = 'none';
    onePlayerSelection.classList.remove('hidden');
    twoPlayersSelection.classList.remove('hidden');
};

// One player selection
const onePlayerSelectionHandler = () => {
    document.getElementById('greetings-text').innerText = 'Select a character to play with:';
    onePlayerSelection.classList.add('hidden');
    twoPlayersSelection.classList.add('hidden');
    xCharacter.classList.remove('hidden');
    yCharacter.classList.remove('hidden');
};

// X character selected
const xCharacterSelected = () => {
    player1Text = xCharacter.getAttribute('value');
    player2Text = yCharacter.getAttribute('value');
    xCharacter.classList.add('hidden');
    yCharacter.classList.add('hidden');
    document.getElementById('tick-boxes-parent-container').classList.remove('hidden');
    document.getElementById('greetings-text').innerText = 'You VS Computer';
    // Show the score board
    scoreBoard.style.display = 'block';
};

// Y character selected
const yCharacterSelected = () => {
    player1Text = yCharacter.getAttribute('value');
    player2Text = xCharacter.getAttribute('value');
    xCharacter.classList.add('hidden');
    yCharacter.classList.add('hidden');
    document.getElementById('tick-boxes-parent-container').classList.remove('hidden');
    document.getElementById('greetings-text').innerText = 'You VS Computer';
    // Show the score board
    scoreBoard.style.display = 'block';
};

// Check for a win
const checkForWin = (playerText) => {
    return winningStreaks.some(combination => {
        return combination.every(index => {
            return tickBoxes[index].innerText === playerText;
        });
    });
};

// Reset the board
const resetBoard = () => {
    tickBoxes.forEach(box => box.innerHTML = '');
};

// Player two automatic play
const player2AutoPlay = () => {
    let emptyBoxes = tickBoxes.filter(box => box.innerHTML === '');
    if (emptyBoxes.length === 0) return; // No empty boxes left

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    setTimeout(() => {
        randomBox.innerText = player2Text;
        if (checkForWin(player2Text)) {
            computerScore++;
            computerScoreElement.innerText = computerScore;
            setTimeout(() => {
                alert("Computer wins!");
                resetBoard();
            }, 1000);
        }
    }, 1000);
};

// Single Player play functionalities
const singlePlayerPlay = () => {
    tickBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (box.innerHTML === '') {
                box.innerText = player1Text;
                if (checkForWin(player1Text)) {
                    playerScore++;
                    playerScoreElement.innerText = playerScore;
                    setTimeout(() => {
                        alert("You win!");
                        resetBoard();
                    }, 1000);
                } else {
                    player2AutoPlay();
                }
            } else {
                alert('You cannot tic-tac-toe here!');
            }
        });
    });
};

// Event Listeners
playBtn.addEventListener('click', startPlay);
onePlayerSelection.addEventListener('click', onePlayerSelectionHandler);
xCharacter.addEventListener('click', xCharacterSelected);
yCharacter.addEventListener('click', yCharacterSelected);

// Initialize single player play
singlePlayerPlay();