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

// Game type variable one player/two player
let game_type;

const onePlayerScoreBoard = document.getElementById('one-player-score-board');
const twoPlayerScoreBoard = document.getElementById('two-player-score-board');
// One player mode score
const single_match_player = document.getElementById('player-score');
const single_match_computer = document.getElementById('computer-score');

// Two player mode score
const two_player_match_player1 = document.getElementById('player1-score');
const two_player_match_player2 = document.getElementById('player2-score');

// Functions Declaration

// Start the game
const startPlay = () => {
    document.getElementById('greetings-text').innerText = 'How many players do you want in the game?';
    playBtn.style.display = 'none';
    onePlayerSelection.classList.remove('hidden');
    twoPlayersSelection.classList.remove('hidden');
};

// One player selection
const oneplayerSelectionHandler = () => {
    document.getElementById('greetings-text').innerText = 'Select a character to play with:';
    onePlayerSelection.classList.add('hidden');
    twoPlayersSelection.classList.add('hidden');
    xCharacter.classList.remove('hidden');
    yCharacter.classList.remove('hidden');
    game_type = 'onePlayer';
};

// Two player selection
const twoPlayerSelectionHandler = () => {
    document.getElementById('greetings-text').innerText = 'Select a character to play with:';
    onePlayerSelection.classList.add('hidden');
    twoPlayersSelection.classList.add('hidden');
    xCharacter.classList.remove('hidden');
    yCharacter.classList.remove('hidden');
    game_type = 'twoPlayer';
};

// X character selected
const xCharacterSelected = () => {
    player1Text = xCharacter.getAttribute('value');
    player2Text = yCharacter.getAttribute('value');
    xCharacter.classList.add('hidden');
    yCharacter.classList.add('hidden');
    document.getElementById('tick-boxes-parent-container').classList.remove('hidden');
    if (game_type == 'onePlayer') {
        document.getElementById('greetings-text').innerText = 'You VS Computer';
        // Show the score board
        onePlayerScoreBoard.style.display = 'block';
        singlePlayerPlay();
    }
    else if (game_type == 'twoPlayer') {
        document.getElementById('greetings-text').innerText = 'Player1 VS Player2';
        // Show the score board
        twoPlayerScoreBoard.style.display = 'block';
        twoPlayerPlay();
    }
};

// Y character selected
const yCharacterSelected = () => {
    player1Text = yCharacter.getAttribute('value');
    player2Text = xCharacter.getAttribute('value');
    xCharacter.classList.add('hidden');
    yCharacter.classList.add('hidden');
    document.getElementById('tick-boxes-parent-container').classList.remove('hidden');
    if (game_type == 'onePlayer') {
        document.getElementById('greetings-text').innerText = 'You VS Computer';
        // Show the score board
        onePlayerScoreBoard.style.display = 'block';
        singlePlayerPlay();
    }
    else if (game_type == 'twoPlayer') {
        document.getElementById('greetings-text').innerText = 'Player1 VS Player2';
        // Show the score board
        twoPlayerScoreBoard.style.display = 'block';
        twoPlayerPlay();
    }
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
        randomBox.style.color = 'white';
        randomBox.innerText = player2Text;
        if (checkForWin(player2Text)) {
            computerScore++;
            single_match_computer.innerText = computerScore;
            setTimeout(() => {
                alert("Computer wins!");
                resetBoard();
            }, 500);
        }
    }, 1000);
};

// Single Player play functionalities
const singlePlayerPlay = () => {
    tickBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (box.innerHTML === '') {
                box.style.color = 'yellow';
                box.innerText = player1Text;
                if (checkForWin(player1Text)) {
                    playerScore++;
                    single_match_player.innerText = playerScore;
                    setTimeout(() => {
                        alert("You win!");
                        resetBoard();
                    }, 500);
                } else {
                    player2AutoPlay();
                }
            } else {
                alert('You cannot tic-tac-toe here!');
            }
        });
    });
};

// Two Player play functionalities
const twoPlayerPlay = () => {
    let currentPlayer = player1Text;
    tickBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (box.innerHTML === '') {
                box.style.color = currentPlayer === player1Text ? 'yellow' : 'white';
                box.innerText = currentPlayer;
                if (checkForWin(currentPlayer)) {
                    if (currentPlayer === player1Text) {
                        playerScore++;
                        two_player_match_player1.innerText = playerScore;
                        setTimeout(() => {
                            alert("Player 1 wins!");
                            resetBoard();
                        }, 500);
                    } else {
                        computerScore++;
                        two_player_match_player2.innerText = computerScore;
                        setTimeout(() => {
                            alert("Player 2 wins!");
                            resetBoard();
                        }, 500);
                    }
                } else {
                    currentPlayer = currentPlayer === player1Text ? player2Text : player1Text;
                }
            } else {
                alert('You cannot tic-tac-toe here!');
            }
        });
    });
};

// Event Listeners
playBtn.addEventListener('click', startPlay);
onePlayerSelection.addEventListener('click', oneplayerSelectionHandler);
twoPlayersSelection.addEventListener('click', twoPlayerSelectionHandler);
xCharacter.addEventListener('click', xCharacterSelected);
yCharacter.addEventListener('click', yCharacterSelected);
