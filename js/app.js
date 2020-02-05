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
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");   // grab the subheader
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  render();   // we'll write this later
}

function render() {
  // todo
}
function render() {
  board.forEach(function(mark, index) {
    console.log(mark, index);
  });
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;    // writes an X or an O on board
  });
}

function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  turn = "X";

  render();
}

function takeTurn(e) {
  let index = squares.findIndex(function(square) {
    return square === e.target;
  });
}

function takeTurn(e) {
  let index = squares.findIndex(function(square) {
    return square === e.target;
  });

  board[index] = turn;
  turn = turn === "X" ? "O" : "X";  // alternate turns

  render();
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;    // writes an X or an O on board
  });

  message.textContent = `Turn: ${turn}`;
}

function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  turn = "X";
  win = null;

  render();
}

if (board[0] && board[0] === board[1] && board[1] === board[2]) {
  win = board[0];   // either X or O
} else if (/* next winning condition */) {
  win = board[0];   // either X or O
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

  return winner;
}

function takeTurn(e) {
  let index = squares.findIndex(function(square) {
    return square === e.target;
  });

  board[index] = turn;
  turn = turn === "X" ? "O" : "X";
  win = getWinner();

  render();
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent = win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    board[index] = turn;
    turn = turn === "X" ? "O" : "X";
    win = getWinner();

    render();
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

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

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
//Moving on... While this works, it seems like a lot of repetitive code. How about ternary statements?

win = board[0] && board[0] === board[1] && board[1] === board[2] ? board[0] : null;  // X, O, or null

// and so on, and so forth
This works, too, and we're doing a lot of the same things. We can do better, though. Let's write out all of the possible winning conditions (there's only 8) and put them in the constants section.
Go ahead and test out your app! Looks pretty good, right? We're not quite done yet, though. When a player wins, we want to halt the game. A quick modification to the takeTurn function will fix that.
Now, we're only going to proceed taking turns if a winner hasn't yet been declared. Next on the list: accounting for situations in which the game ends in a tie. It requires a simple change to the getWinner function.
Now, our getWinner function returns one of four possible values: "X", "O", "T", or null. We have to modify our render function to handle the newly added return value.
We're now handling wins and ties. So how do we restart the game? We've got our reset button, but it doesn't do anything yet. Luckily, we already have an init function that does all the setup for us. Let's just reuse that by referencing it in the event listeners section.

Everything is now up-and-running. Well, almost. There's one bug in our program. If you click the same square more than once, its mark changes. Once a square has been marked, we don't want the other player to be able to overwrite that mark.

We need to modify the takeTurn function so that it first checks the contents of a square before marking it.


And that's it! You've written a fully functional tic-tac-toe app from scratch!
//Now, declare a variable to represent the board in the app state section.
//We also need a function to initialize the state of our game (i.e., construct the board). We'll use an array, initially pre-loaded with empty strings to represent the grid squares. This goes in the functions section.
//We need to make sure our init function is called. There are a few different ways to go about doing this. We're going to attach it to an onload listener and throw it in our event listeners section.
//This function will be called as soon as the page finishes loading.
//So what does our render function need to do? It needs to be able to iterate over each row on the board and each square in that row. Remember those built-in Array methods? Time to put them to good use. For now, we'll just print stuff to the console.
//In order to interact with our board, we need the current state of the board as it exists in the browser. We'll use some built-in magic to grab that from the HTML. Put this in the cached element references section.
//Array.from builds an array from all of the elements returned by querySelectorAll. We're using querySelectorAll to find the element whose ID is board, then grabbing all of the children divs of that element. Saves us the time and hassle of providing each square a unique ID, selecting them individually, and building the array manually.
