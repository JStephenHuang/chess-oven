import { getLegalMoves } from "./getLegalMoves.js";
import { getPiecesPosition } from "./getPiecesPosition.js";

export function getThreatenedPieces(focusedSquare) {
  // takes in a focused piece, returns the array of all the opponent pieces under attack by the focused piece
    const threatenedPieces = []
    const legalMoves = getLegalMoves(focusedSquare)
    const piecesPosition = getPiecesPosition().reverse()

    for (const move of legalMoves) {
      const col = move[0]
      const row = move[1]
      const piece = piecesPosition[row][col]

      if (piece !== "") {
        threatenedPieces.push({position: move, piece: piece})
      }
    }

    return threatenedPieces
}