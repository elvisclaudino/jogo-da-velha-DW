const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.querySelector("[data-restart-button]");

//Variável de controle da vez da jogada
let isCircleTurn;

//Determina as combinações possíveis de uma vitória
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

//Inicia o Jogo (entry-point)
const startGame = () => {
  //Adiciona os eventos para cada célula do board
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    //Adiciona um evento que será executado ao "click", informado o handle
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
    if (isCircleTurn) {
      winningMessageText.innerText = "O ganhou!"
      axios.post(`http://localhost:3033/users/defeats/${localStorage.getItem('username')}`, {
      });

    }else{
      winningMessageText.innerText = localStorage.getItem('username') + " ganhou!"
      axios.post(`http://localhost:3033/users/wins/${localStorage.getItem('username')}`, {
      });
    }
  }

  winningMessage.classList.add("winning__message-show");
};

//Verifica se há um ganhador
const checkForWin = (currentPlayer) => {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

//Verifica se há um empate
const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

//Altera o hover para informar quem deve realizar a jogada
const setBoardHoverClass = () => {
  //Realiza a limpeza
  board.classList.remove("circle");
  board.classList.remove("x");

  //Adiciona um novo a partir da condicional
  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

//Realiza o togle da vez de jogada
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  //Realiza a chamada da função para alterar o hover
  setBoardHoverClass();
};

const handleClick = (e) => {
  //Define qual celular que receberá o elemento da jogada
  const cell = e.target;
  //Determina o que será adicionado, analizando se é ou não a vez do jogador "circulo"
  const classToAdd = isCircleTurn ? "circle" : "x";

  //Chama a função que realiza a marcação da jogada
  placeMark(cell, classToAdd);

  // Verifica se já exixte ganhador 
  const isWin = checkForWin(classToAdd);

  // Verifica um empate
  const isDraw = checkForDraw();

  //Realiza a finalização da jogada, determinado se a partida acabou
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Change simble
    swapTurns();
  }
};

//Calcula a melhor jogada no cenário
const bestMove = () =>{

}

//Funçao que realiza a execuçao da rotina de jogo do computador
const computer = ()=>{

}

//Chama o entry-point do jogo
startGame();

//Adiciona o evento de restant do jogo chamando novamente o entry-point
restartButton.addEventListener("click", startGame);
