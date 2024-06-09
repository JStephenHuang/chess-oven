import { isDifferentColor } from "../helper/isDifferentColor.js";
import { moveHistory } from "../helper/onClick.js";
// import { handleEnPassantforWhite } from "../helper/onEnPassant.js";
// import { handleEnPassantforBlack } from "../helper/onEnPassant.js";

export function getPawnLegalMoves(initial, position, board) {
  const { row, col } = position; // b4: col -> 1,  row -> 3
  const legalMoves = [];

  const direction = initial === "P" ? 1 : -1;

  const front = board[row + direction][col];
  if (col >= 1 && col <= 7) {
    // checking to see if columns in range
    const diagonalLeft = board[row + direction][col - 1];
    if (diagonalLeft !== "" && isDifferentColor(initial, diagonalLeft)) {
      legalMoves.push(`${col - 1}${row + direction}`);
    }
  }

  if (col >= 0 && col <= 6) {
    const diagonalRight = board[row + direction][col + 1];
    if (diagonalRight !== "" && isDifferentColor(initial, diagonalRight)) {
      legalMoves.push(`${col + 1}${row + direction}`);
    }
  }

  if (front === "") {
    // double push if pawn on 2nd row
    legalMoves.push(`${col}${row + direction}`);
    if (row === 1 && board[row + 2 * direction][col] === "") {
      // rows are 0-indexed, row = 1 -> row 2 on the board
      legalMoves.push(`${col}${row + 2 * direction}`);
    } else if (row === 6 && board[row + 2 * direction][col] === "") {
      legalMoves.push(`${col}${row + 2 * direction}`);
    }
  }

  let lastMove = moveHistory[moveHistory.length - 1];
  if (row === 4 && initial === "P") {
    const startPosition = lastMove.start;
    const endPosition = lastMove.end; // end . ? for i => object[i]
    let startRow = startPosition[2];
    let endRow = endPosition[2];
    let deltaRow = startRow - endRow;
    let passantCol = endPosition[1];
    if (endPosition[0] === "p" && endRow === "4" && Math.abs(deltaRow) === 2) {
      if (parseInt(passantCol) === col - 1) {
        legalMoves.push(`${col - 1}${row + 1}`);
        let passantId = `${col - 1}${row}`;
        console.log(passantId);
        let passantSquare = document.getElementById(passantId);
        // if (isEnPassant(startPosition, endPosition)) {
        //   passantSquare.innerHTML = "";
        // }
      }
      if (parseInt(passantCol) === col + 1) {
        legalMoves.push(`${col + 1}${row + 1}`);
        let passantId = `${col + 1}${row}`;
        let passantSquare = document.getElementById(passantId);

        // if (isEnPassant(startPosition, endPosition)) {
        //   passantSquare.innerHTML = "";
        // }
      }
    }
  }
  if (row === 3 && initial === "p") {
    console.log(lastMove);
    const startPosition = lastMove.start;
    const endPosition = lastMove.end; // end . ? for i => object[i]
    // handleEnPassantforBlack(startPosition, endPosition, col, row);
    let startRow = startPosition[2];
    let endRow = endPosition[2];
    let deltaRow = startRow - endRow;
    let passantCol = endPosition[1];
    console.log(endPosition);
    console.log(passantCol);

    let passantId = `${passantCol - 1}${endRow}`;
    console.log(passantId);
    if (endPosition[0] === "P" && endRow === "3" && Math.abs(deltaRow) === 2) {
      console.log(col);
      if (parseInt(passantCol) === col - 1) {
        legalMoves.push(`${col - 1}${row - 1}`);
        passantId = `${col - 1}${row}`;
        let passantSquare = document.getElementById(passantId);
      }
      if (parseInt(passantCol) === col + 1) {
        legalMoves.push(`${col + 1}${row - 1}`);
        passantId = `${col + 1}${row}`;
        let passantSquare = document.getElementById(passantId);
      }
    }
  }
  console.log(moveHistory);
  return legalMoves;
}
