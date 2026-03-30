const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const resetBtn = document.getElementById('reset-btn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resetBtn.addEventListener('click', resetGame);
    updateStatusMessage();
}

function cellClicked(e) {
    const cell = e.target;
    // Get corresponding index from data attribute
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    // If cell already clicked or game stopped, don't do anything
    if (board[cellIndex] !== "" || !gameActive) {
        return;
    }

    updateCell(cell, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatusMessage();
}

function updateStatusMessage() {
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    statusText.style.color = currentPlayer === 'X' ? '#ffd700' : '#00ffff';
    statusText.style.textShadow = currentPlayer === 'X' ? '0 0 10px rgba(255, 215, 0, 0.3)' : '0 0 10px rgba(0, 255, 255, 0.3)';
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = board[condition[0]];
        const b = board[condition[1]];
        const c = board[condition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            winningCells = condition;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        statusText.style.color = '#2ed573';
        statusText.style.textShadow = '0 0 10px rgba(46, 213, 115, 0.5)';
        gameActive = false;
        
        // Highlight winning cells
        winningCells.forEach(index => {
            cells[index].classList.add('win');
        });
        return;
    }

    // Check for draw
    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        statusText.style.color = '#fff';
        statusText.style.textShadow = 'none';
        gameActive = false;
        return;
    }

    changePlayer();
}

function resetGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    updateStatusMessage();
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o', 'win');
    });
}

// Start the game
initializeGame();
