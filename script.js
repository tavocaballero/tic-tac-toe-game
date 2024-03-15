const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = "X";
const board = document.getElementById('ticTacToeBoard');
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkForWin = (currentPlayer) => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
};

const checkForDraw = () => {
    return [...cells].every(cell => cell.textContent && cell.textContent !== '');
};

const endGame = (winner) => {
    if (winner === 'Draw') {
        alert('Draw!');
    } else {
        alert(`${winner} Wins!`);
    }
    resetGame();
};

const aiMove = () => {
    const availableCells = [...cells].filter(cell => !cell.textContent);
    if (availableCells.length === 0) return;
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    randomCell.textContent = 'O';
    if (checkForWin('O')) {
        endGame('O');
    } else if (checkForDraw()) {
        endGame('Draw');
    }
    currentPlayer = "X";
};

const resetGame = () => {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = "X"; // Reset to player X
};

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        if (e.target.textContent || currentPlayer !== "X") return;
        e.target.textContent = currentPlayer;
        if (checkForWin(currentPlayer)) {
            endGame(currentPlayer);
        } else if (checkForDraw()) {
            endGame('Draw');
        } else {
            currentPlayer = "O";
            setTimeout(aiMove, 500); // AI makes a move after a short delay
        }
    });
});
