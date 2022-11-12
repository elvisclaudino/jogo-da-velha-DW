const currentPlayer = document.querySelector(".currentPlayer");

let selecionado;
let jogador = "X";

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function init() {
  selecionado = [];

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${jogador}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = " ";
    item.addEventListener("click", newMove);
  });
}

init();

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = jogador;
  e.target.removeEventListener("click", newMove);
  selecionado[index] = jogador;
    
  check();

  jogador = jogador === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${jogador}`;
}

function check() {
  let ultimomov = jogador === "X" ? "O" : "X";

  const items = selecionado
    .map((item, i) => [item, i])
    .filter((item) => item[0] === ultimomov)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      alert("O JOGADOR '" + ultimomov + "' GANHOU!");
      init();
      return;
    }
  }

  if (selecionado.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    init();
    return;
  }
}
