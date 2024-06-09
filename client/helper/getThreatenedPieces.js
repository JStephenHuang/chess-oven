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
  const threatenedPieces = [];

  for (let i = 0; i < 8; i++) {
    const row = board[i];

    for (let j = 0; j < 8; j++) {
      const initial = row[j];

      if (color === "white") {
        // if the selected piece is white (white's turn) -> check all legal moves for black for check
        if (initial !== "" && initial === initial.toLowerCase()) {
          const squareDiv = document.getElementById(`${j}${7 - i}`);

          threatenedPieces.push(...getThreatenedPieces(squareDiv));
          // add all legal moves to opponentLegalMoves
        }
      } else {
        // if black: check all legal moves for white
        if (initial !== "" && initial === initial.toUpperCase()) {
          const squareDiv = document.getElementById(`${j}${7 - i}`);

          threatenedPieces.push(...getThreatenedPieces(squareDiv));
          // add all legal moves to opponentLegalMoves
        }
      }
    }
  }

  return threatenedPieces
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

