const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                alert(`Player ${currentPlayer} wins!`);
                // Reset the game or perform other actions as needed
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

function checkWinner() {
    // Implement your logic to check for a winner
    // Return true if there is a winner, false otherwise
}

