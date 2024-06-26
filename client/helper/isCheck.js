import { getAllThreatenedPieces } from "./getThreatenedPieces.js";

export function isCheck(board, color) {  // if color -> white, sees is white is in check.
    //const pieceInitial = focusedSquare.childNodes[0].id

    const opponentColor = color === "white" ? "black" : "white"

    const allThreatenedPieces = getAllThreatenedPieces(board, opponentColor)  // array of all threatened pieces on previewBoard

    for (const threatenedPiece of allThreatenedPieces) { // [p,r,r,k,q] -> True (in check)  
        if (threatenedPiece.piece === "k" || threatenedPiece.piece === "K") {
            
            return true

        } 
    }
    return false
}

