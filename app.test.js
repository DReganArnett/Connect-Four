// function makeBoard() {
//   for (let y = 0; y < HEIGHT; y++){
//     let row = [];
//     for (let x = 0; x < WIDTH; x++){
//       row.push(null);
//     }
//     board.push(row);
//   }
// }
describe('makeBoard tests' , function () { 
  it ('should create 6 empty arrays inside of the board array', function () {
    const HEIGHT = 6;
    const WIDTH = 7;
    let row = [];
    makeBoard();
    expect (board).toContain([ [], [], [], [], [], [] ] );
  })

  it ('should push 7 null values into each of the 6 arrays within the board array', function () {
    let board = [];
    const HEIGHT = 6;
    const WIDTH = 7;;
    expect ((board)).toBe([
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ])
  })
})


describe('handleClick tests', function () {
  handleClick(evt);
  findSpotForCol(x);
  placeInTable(y, x);
  checkForWin();
  endGame(msg);
  _win(cells);
})

