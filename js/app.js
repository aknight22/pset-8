//Allow players to keep score (i.e., how many games has each player won).
//Allow players to determine who goes first (instead of X always going first).



///////////////////// CONSTANTS /////////////////////////////////////
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
///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let xwins = 0;
let owins = 0;
let ties = 0;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");   // grab the subheader
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("reset-score").onclick = resetScore;
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  do {
    var player1 = window.prompt("Who goes first: X or O?")
    player1 = player1.toLowerCase;
    if (player1 === null) {
      turn = "X";
      break;
    } else if (player1 === "x"){
      turn = "X";
    } else if (player1 === "o"){
      turn = "O";
  }
} while (player1 !== "x" && player1 !== "o");

  win = null;

  render();
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });
  if (win === "X") {
    xwins = xwins + 1;
  } else if (win === "O") {
    owins = owins +1;
  } else if (win === "T") {
    ties = ties + 1;
  }

  xscore.innerHTML = xiwns;
  oscore.innerHTML = owins;
  ties.innerHTML = ties;

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();

      render();
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}
