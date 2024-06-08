import { getAllLegalMoves, getLegalMoves } from "./getLegalMoves.js";
import { getPiecesPosition } from "./getPiecesPosition.js";
import { getAllThreatenedPieces, getThreatenedPieces } from "./getThreatenedPieces.js";
import { previewBoard } from "./previewBoard.js";

export function getAllLegalMovesOnCheck(focusedSquare) {  // takes in a focused square with a piece. If a white piece is selected, returns true if white in check or if a black piece is selected and black king in check. False if king not in check
    const pieceInitial = focusedSquare.childNodes[0].id

    const legalMoves = []

    const color = pieceInitial === pieceInitial.toUpperCase() ? "white" : "black"
    const opponentColor = pieceInitial === pieceInitial.toUpperCase() ? "black" : "white" 
    
    const board = getPiecesPosition()

    // iterating thru the board  
    const allLegalMoves = getAllLegalMoves(board, color)  // [{id, legalMoves}] id => position of the square, legaMoves => array of all legal moves of the square

    for (const legalMove of allLegalMoves) {   // for each object
        for (const move of legalMove.legalMoves) {   // for each legal move of piece
            
            const previewedBoard = previewBoard(pieceInitial, legalMove.position, move)   // make preview of the board after move
            
            const allThreatenedPieces = getAllThreatenedPieces(previewedBoard, opponentColor)  // array of all threatened pieces on previewBoard

            for (const threatenedPiece of allThreatenedPieces) {
                if (threatenedPiece.piece !== "k" && threatenedPiece.piece !== "K") {
                    legalMoves.push(move)
                }
            }
        }
    }

    return legalMoves
}

// iterate thru opponents pieces
// get all arrays of legal moves
// check if your own king is inside any of the arrays
// if so -> check
// else default onClick