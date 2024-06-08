import { getAllThreatenedPieces } from "./getThreatenedPieces.js";
import { previewBoard } from "./previewBoard.js";

export function isCheck(focusedSquare, targetSquare) {  // takes in a focused square with a piece. If a white piece is selected, returns true if white in check or if a black piece is selected and black king in check. False if king not in check
    const pieceInitial = focusedSquare.childNodes[0].id
    const opponentColor = pieceInitial === pieceInitial.toUpperCase() ? "black" : "white" 

    const previewedBoard = previewBoard(pieceInitial, focusedSquare.id, targetSquare.id)  // make preview of the board after move

    const allThreatenedPieces = getAllThreatenedPieces(previewedBoard, opponentColor)  // array of all threatened pieces on previewBoard

    for (const threatenedPiece of allThreatenedPieces) { // [p,r,r,k,q] -> True (in check)  
        if (threatenedPiece.piece === "k" || threatenedPiece.piece === "K") {
            return true
        } 
    }
    return false
}
