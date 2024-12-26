const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameActive = true; // Track if the game is active
let gameState = ['', '', '', '', '', '', '', '', '']; // Track cell states

// Winning conditions
const winningConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];

// Handle cell click
function handleCellClick(event) {
   const clickedCell = event.target; 
   const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

   if (gameState[clickedCellIndex] !== '' || !gameActive) {
       return; // Ignore if cell is already filled or game is not active
   }

   // Update cell and game state
   gameState[clickedCellIndex] = currentPlayer; 
   clickedCell.textContent = currentPlayer;

   checkResult();
}

// Check for winning conditions or draw
function checkResult() {
   let roundWon = false;

   for (let i = 0; i < winningConditions.length; i++) {
       const condition = winningConditions[i];
       const a = gameState[condition[0]];
       const b = gameState[condition[1]];
       const c = gameState[condition[2]];

       if (a === '' || b === '' || c === '') {
           continue; // Skip if any cell is empty
       }
       if (a === b && b === c) {
           roundWon = true; // We have a winner!
           break;
       }
   }

   if (roundWon) {
       statusDisplay.textContent = `Player ${currentPlayer} has won!`;
       gameActive = false; // End the game
       return;
   }

   if (!gameState.includes('')) {
       statusDisplay.textContent = 'Game ended in a draw!';
       gameActive = false; // End the game
   }

   currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
}

// Reset the game
function resetGame() {
   gameActive = true; 
   currentPlayer = 'X';
   gameState.fill('');
   cells.forEach(cell => cell.textContent = '');
   statusDisplay.textContent = '';
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
