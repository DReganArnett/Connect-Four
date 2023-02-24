/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const HEIGHT = 6;
const WIDTH = 7;



let currPlayer = 1; // active player: 1 or 2
let board = []; // contains data for the game board consisting of an array of rows, each row is an array of cells 

/** makeBoard: create in-JS board structure:
 *  board = array of rows, each row is array of cells  (board[y][x])
 */
//Line 26: The makeBoard function creates an array of arrays. The outer array will contain the entire game board, which will contain the 
//data for a table that we will create dynamically with the makeHtmlBoard function. The inner arrays will contain the individual 
//rows of the game board, containing seven null values, which will represent the eventual columns of the game board.
//Lines 27 and 28: creates six empty arrays (the desired height of the game board), which will contain the data for the rows.  
//Lines 29 and 30: pushes seven null values (the desired width of the game board) into the row arrays just created, null values representing empty cells
//Line 32: pushes the newly created row arrays into the array created for the <table> element in the HTML with the id of "board"


function makeBoard() {
  for (let y = 0; y < HEIGHT; y++){
    let row = [];
    for (let x = 0; x < WIDTH; x++){
      row.push(null);
    }
    board.push(row);
  }
}

// PART 1 - Line 43: defining the makeHtmlBoard function, which is creating the top HTML table row and cells that will appear in dotted style above
// the board and function as the clickable cells of the columns the players will drop their pieces into.
// Line 44: defines the "board" variable from the DOM (the <table> element in HTML w/ID of "board")
// Line 45: creates the top table row, that will hold the clickable cells
// Line 46: gives the top table row we just created an id of "column-top"
// Line 47: makes the top row clickable with an event listener that will run the handleClick function upon each click

function makeHtmlBoard() {
  const board = document.querySelector('#board');
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

// PART 2 of the function is creating the cells within the top row just created above and giving them the id of "x" 
// Line 55: a for-loop that iterates 7 times to create the number of cells equal to the width specified above
// Line 56: dynamically creates the <td> elements that will make up those cells
// Line 57: gives the newly-created cells the id of "x"
// Line 58: appends the cells to the top table row 
// Line 60: appends the top table row to the "board" element in the HTML
  for(let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }
  board.append(top);


// PART 3 of the function is creating the remaining table rows and cells and giving them the ids of "y-x"
// Line 71: for-loop that iterates 6 times (equal to the desired height of the game board) to create the remaining rows
// Line 72: dynamically creates the <tr> elements that will make up those rows
// Line 73: iterates through each of the newly-created rows to create the cells for each of the rows
// Line 74: dynamically creates the <td> elements that will make up those cells
// Line 75: gives the newly-created cells the id of `${y}-{x}`
// Line 76: appends the cells to the rows
// Line 78: appends the rows to the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}    

/** findSpotForCol: given column x, return top empty y (null if filled) */

// Line 91: defining the findSpotForCol function.  When the user clicks on a column in the top row, the functon iterates through the cells in the 
// column from bottom to top to find the first available cell for which to place the players game piece
// Line 91: iterates through the cells 
// Line 92: if the cell contains a value of "null", then it is identified as the first available cell
// Line 93: returns the y coordinate of the lowest available cell in the column
// Line 96: if no cells in the column are available, the function returns "null"
function findSpotForCol(x) {
  for(let y = HEIGHT-1; y >= 0; y--){
    if (board[y][x] === null) {
      return y;  
    }   
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
// This function makes the red or blue circle appear in the bottom-most available cell,
// of the column the player has clicked on, identified by the targetSpot variable. The 
// y-value of the targetSpot was obtained from the findSpotForCol() function above
// Line 109: dynamically creates a <div> that is styled in CSS to be either a yellow or blue circle
// Line 110: adds 'piece to the classList of the the newly-created <div> to allow for styling in CSS
// Line 111: adds `p${currPlayer}` to the classList of the <div> to specify which player color it should be styled to 
// Line 112: gets the y-x coordinates the game piece will drop into from the DOM (whose y was specified in the findSpotForCol function)
// Line 113: appends the player's newly-created piece to the coordinates specified in line 112
function placeInTable (y, x) {
  const piece = document.createElement("div"); //creates a div to represent a piece
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`); //adds the p1/p2 class to identify which player's piece it is
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}


/** endGame: announce game end */
// The endGame function alerts the user of the game's result when the game ends via a browser alert.
// The message displayed is specified in the checkForWin function
// Line 122: waits 500 milliseconds before displaying the alert, giving the final game piece time to appear on the board
function endGame(msg) {
  setTimeout(()=> alert(msg), 500);
}

/** handleClick: handle click of column top to play piece */
// When the next player clicks on a cell in the top row of the board, the handleClick function places the game piece in 
// the corresponding column, which is the ID given to that cell in PART 2 of the makeHtmlBoard function.
// Line 141: gets the  x-coordinate of the location where the player's piece will go from the ID of clicked cell
// Line 142: get the y-coordinate of the next available cell in the column by calling the findSpotForCol function on the x-coordinate of 
//        the column the player has clicked on
// Lines  143 and 144: checks to see if the column is full.  If so, it ignores the click
// Line 147: updates the "board" with the currPlayer value in the location corresponding to the placed piece
// Line 148: calls the placeInTable function, placing the player's game piece in the correct location on the board
// Line 150: checks for a winner - the checkForWin function is called
// Line 151: if the checkForWin function returns true, then the endGame function is called, alerting the players of the winner
// Line 154: checks for tie - since a null value indicates an empty cell, if every cell does not contain a null value, then then entire board is full 
//        indicating the game has ended in a tie
// Line 155: if the above if statement returns true, then the endGame function is called, alerting the players of the tie
// Line 157: switches the currPlayer variable's value to the opposite player 
function handleClick(evt) {
  let x = +evt.target.id;
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  board[y][x] = currPlayer;
  placeInTable(y, x);

  if (checkForWin()) {
      return endGame(`Player ${currPlayer} wins!`);
  }

  if (board.every(row => row.every(cell => cell))) {
    return endGame("It's a Tie!");
  }
    currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
// Line 176: The checkForWin function checks cells around to see if they're all color of current player
//     returns true if all are legal coordinates & all match currPlayer
// Lines 177 through 186: The _win function checks the coordinates of the piece just played to make sure that:
//  - the index of the y-coordinate is on the board (between 0 and 6)
//  - the index of the x-coordinate is on the board (between 0 and 7)
//  - the cell is identified as played by the current player
// Lines 188 and 189 : these two loops check for winning patterns. The outer loop iterates througth the rows,
//    and then the inner loop checks each cell for a winning pattern before moving on to the next row via the outer loop.
// Lines 190 through 193: gets a list of four cells for each of the winning patterns. 
//    - the horiz variable identifies winning horizontal patterns
//    - the vert variable identifies winning vertical patterns
//    - the diagDR variable identifies winning right diagonal patterns
//    - the diagDL variable identifies winning left diagonal patterns
// Line 195: the final if-statement returns true when a winning pattern is identified
 
function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) => 
        y >= 0 &&
        y < HEIGHT && 
        x >= 0 && 
        x < WIDTH && 
        board[y][x] === currPlayer
    );   
  }
  
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// Lines 203 and 204: call the makeBoard and makeHtmlBoard functions, which renders the board and begins the game
makeBoard();
makeHtmlBoard();
// When the user clicks on a column, be able to identify the cell being played on 