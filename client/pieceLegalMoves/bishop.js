import { isLegalMove } from "../helper/isLegalMove.js";

export function getBishopLegalMoves(initial, position, board) {
    const { row, col } = position 
    const legalMoves = []

    const bishopDirections = [
      {x: 1, y: 1}, {x: 1, y: -1},
      {x: -1, y: 1}, {x: -1, y: -1}
    ]
    
    const bishopMoves = []
    // find limits of bishop moves
    for (const direction of bishopDirections) {  // for each direction
      let counter = 1

      while (row + counter * direction.y < 8 &&
             row + counter * direction.y >= 0 &&
             col + counter * direction.x >= 0 &&
             col + counter * direction.x < 8 ) {

        const targetRow = row + counter * direction.y
        const targetCol = col + counter * direction.x

        bishopMoves.push({targetRow: targetRow, targetCol: targetCol})

        if (board[targetRow][targetCol] !== '') {
          break
        }  
        counter ++
      } 

    }

    for (const move of bishopMoves) {
      isLegalMove(initial, board, move.targetRow, move.targetCol, legalMoves)
    }

    return legalMoves
}