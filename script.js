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
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
};

const endGame = (draw) => {
    if (draw) {
        alert('Draw!');
    } else {
        alert(`${currentPlayer} Wins!`);
    }
    resetGame();
};

const aiMove = () => {
    const availableCells = [...cells].filter(cell => cell.textContent === '');
    if (availableCells.length === 0) return;
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    randomCell.textContent = 'O';
    currentPlayer = "X";
    if (checkForWin('O')) {
        endGame(false);
    } else if (checkForDraw()) {
        endGame(true);
    }
};

const resetGame = () => {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = "X"; // Reset to player X
};

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        if (e.target.textContent !== '' || currentPlayer !== "X") return;
        e.target.textContent = currentPlayer;
        if (checkForWin(currentPlayer)) {
            endGame(false);
        } else if (checkForDraw()) {
            endGame(true);
        } else {
            currentPlayer = "O";
            setTimeout(aiMove, 500); // AI makes a move after a short delay
        }
    });
});
