const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  isCircleTurn = false;

  setBoardHoverClass();
  winningMessage.classList.remove("winning__message-show");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageText.innerText = "Empate!";
  } else {
    winningMessageText.innerText = isCircleTurn ? "O ganhou!" : "X ganhou!";
  }

  winningMessage.classList.add("winning__message-show");
};

const checkForWin = (currentPlayer) => {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  // Set X or Cicle
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verify winner
  const isWin = checkForWin(classToAdd);

  // Verify a draw
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Change simble
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
