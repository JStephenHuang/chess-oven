import { getLegalMoves } from "./getLegalMoves.js";

export function getThreatenedPieces(focusedSquare, board) {
  // takes in a focused piece, returns the array of all the opponent pieces under attack by the focused piece

    const threatenedPieces = []
    const legalMoves = getLegalMoves(focusedSquare, board) // board => previewed board
    //const piecesPosition = getPiecesPosition().reverse()

    for (const move of legalMoves) {
      const col = move[0]
      const row = move[1]
      const piece = board[row][col]

    if (piece !== "") {
      threatenedPieces.push({ position: move, piece: piece });
    }
  }

  return threatenedPieces;
}

export function getAllThreatenedPieces(board, color) {
  const threatenedPieces = [] // pieces threatened by the opponent

  for (let i = 0; i < 8; i ++) { 
      const row = board[i]  

      for (let j = 0; j < 8; j ++) {
          const initial = row[j]

           if (initial !== '') {
            const initialColor = color === "white" ? initial.toUpperCase() : initial.toLowerCase()

            if (initial === initialColor) {
                const squareDiv = document.getElementById(`${j}${i}`);
                threatenedPieces.push(...getThreatenedPieces(squareDiv, board));
            }
        }
      }
  }

  return threatenedPieces
}

