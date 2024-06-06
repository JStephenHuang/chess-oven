import { isDifferentColor } from "../helper/isDifferentColor.js";

export function getPawnLegalMoves(initial, position, board) {
    const { row, col } = position // b4: col -> 1,  row -> 3
    const legalMoves = []

    const direction = initial === "P" ? 1 : -1;
    
    const front = board[row + direction][col]

    if (col >= 1 && col <= 7) {  // checking to see if columns in range
      const diagonalLeft = board[row + direction][col - 1]
      if (diagonalLeft !== "" && isDifferentColor(initial, diagonalLeft)) {
          legalMoves.push(`${col - 1}${row + direction}`)
      }
    }
  
    if (col >= 0 && col <= 6) {
      const diagonalRight = board[row + direction][col + 1]
      if (diagonalRight !== "" && isDifferentColor(initial, diagonalRight)) {
          legalMoves.push(`${col + 1}${row + direction}`)
      }
    }

    if (front === "") {   // double push if pawn on 2nd row
        legalMoves.push(`${col}${row + direction}`)
        if (row === 1 && board[row + 2 * direction][col] === "") {   // rows are 0-indexed, row = 1 -> row 2 on the board
          legalMoves.push(`${col}${row + 2 * direction}`)
        } else if (row === 6 && board[row +  2 * direction][col] === "") {
          legalMoves.push(`${col}${row + 2 * direction}`)
        }
    }

    return legalMoves
}