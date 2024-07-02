const cells = document.querySelectorAll('.cell');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');
const gameMessageDisplay = document.getElementById('game-message');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let player1Score = 0;
let player2Score = 0;
let gameOver = false;
let board = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(e) {
    const cellIndex = e.target.id.split('-')[1];

    if (board[cellIndex] === '' && !gameOver) {
        board[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWin();
        changePlayer();
    }
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            gameMessageDisplay.textContent = `Player ${currentPlayer} wins!`;
            if (currentPlayer === 'X') {
                player1Score++;
                player1ScoreDisplay.textContent = player1Score;
            } else {
                player2Score++;
                player2ScoreDisplay.textContent = player2Score;
            }
            return;
        }
    }

    if (!board.includes('')) {
        gameOver = true;
        gameMessageDisplay.textContent = 'It\'s a tie!';
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameOver = false;
    board = ['', '', '', '', '', '', '', '', ''];
    gameMessageDisplay.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);