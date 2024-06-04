const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

function differentColor(initial, piece) {
  if (initial === initial.toUpperCase()) {
    return piece !== piece.toUpperCase();
  } else {
    return piece !== piece.toLowerCase();
  }
}
export function getRookLegalMoves(initial, position, board) {
  let legalMoves = [];
  let potentialMoves = [];

  const { row, col } = position;

  // for the rook moving on the file vertically
  for (let i = 1; i < 9; i++) {
    let potentialSquare = cols[col] + i;
    potentialMoves.push(potentialSquare);
  }

  for (let i = row; i <= 7; i++) {
    // going up

    let potentialSquareUp = `${cols[col]}${i + 1}`;
    let upMove = board[i][col];

    if (upMove == "") {
      legalMoves.push(potentialSquareUp);
    } else if (differentColor(initial, upMove)) {
      legalMoves.push(potentialSquareUp);
      break;
    } else {
      break;
    }
  }

  for (let i = row; i >= 1; i--) {
    //for going down the file
    if (i !== 1) {
      var downMove = board[i - 2][col];
    } else if (i === 1) {
      var downMove = board[i - 1][col];
      break;
    }

    let potentialSquareDown = `${cols[col]}${i - 1}`;
    if (downMove == "") {
      legalMoves.push(potentialSquareDown);
    } else if (differentColor(initial, downMove)) {
      legalMoves.push(potentialSquareDown);
      break;
    } else {
      // Handling the case where the piece is of the same color
      break;
    }
  }

  // going right
  for (let i = col; i < 7; i++) {
    let potentialSquareRight = `${cols[i + 1]}${row}`;
    let rightMove = board[row - 1][i + 1];
    if (rightMove == "") {
      legalMoves.push(potentialSquareRight);
    } else if (differentColor(initial, rightMove)) {
      legalMoves.push(potentialSquareRight);
      break;
    } else if (!differentColor(initial, rightMove)) {
      break;
    }
  }

  // going left
  for (let j = col; j >= 0; j--) {
    if (j === 0) {
      console.log(j);
      break;
    } else if (j !== 0) {
      console.log(j);
      var potentialSquareLeft = `${cols[j - 1]}${row}`;
      var leftMove = board[row - 1][j - 1];
    }

    console.log(potentialSquareLeft);
    console.log(leftMove);
    if (leftMove == "") {
      legalMoves.push(potentialSquareLeft);
    } else if (differentColor(initial, leftMove)) {
      legalMoves.push(potentialSquareLeft);
      break;
    } else if (!differentColor(initial, leftMove)) {
      break;
    }
  }
  console.log(legalMoves);
  return legalMoves;
}
