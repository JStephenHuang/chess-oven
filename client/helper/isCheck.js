import { getLegalMoves } from "./getLegalMoves.js";
import { getPiecesPosition } from "./getPiecesPosition.js";
import { getThreatenedPieces } from "./getThreatenedPieces.js";

export function isCheck(focusedSquare) {  // takes in a focused sqaure with a piece. If a white piece is selected, returns true if white in check or if a black piece is selected and black king in check. False if king not in check
    const pieceInitial = focusedSquare.childNodes[0].id

    const color = pieceInitial === pieceInitial.toUpperCase() ? "white" : "black"
    
    const piecesPosition = getPiecesPosition()

    // iterating thru the board  
    const threatenedPieces = [] // pieces threatened by the opponent

    for (let i = 0; i < 8; i ++) { 
        const row = piecesPosition[i]  
        for (let j = 0; j < 8; j ++) {
            const initial = row[j]
            if (color === 'white') {   // if the selected piece is white (white's turn) -> check all legal moves for black for check  
                if (initial !== '' && initial === initial.toLowerCase()) {
                    const squareDiv = document.getElementById(`${j}${7 - i}`)

                    threatenedPieces.push(...getThreatenedPieces(squareDiv)) 
                    // add all legal moves to opponentLegalMoves
                }
            } else { // if black: check all legal moves for white
                if (initial !== '' && initial === initial.toUpperCase()) {
                    const squareDiv = document.getElementById(`${j}${7 - i}`)
                    
                    threatenedPieces.push(...getThreatenedPieces(squareDiv)) 
                    // add all legal moves to opponentLegalMoves
                }
            }
        }
    }

    for (const threatenedPiece of threatenedPieces) {
        // threatenedPiece => {position: 00, piece: "R"}
        return (threatenedPiece.piece === "k" || threatenedPiece.piece === "K")
    }
}

// iterate thru opponents pieces
// get all arrays of legal moves
// check if your own king is inside any of the arrays
// if so -> check
// else default onClick