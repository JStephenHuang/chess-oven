import { getAllLegalMoves } from "./getLegalMoves.js";
import { isCheck } from "./isCheck.js";
import { previewBoard } from "./previewBoard.js";

export function getAllLegalMovesWithCheck(board, color) {  // takes in a focused square with a piece. If a white piece is selected, returns true if white in check or if a black piece is selected and black king in check. False if king not in check
    const legalMoves = []

    // iterating thru the board  
    const allLegalMoves = getAllLegalMoves(board, color)  // [{id, legalMoves}] id => position of the square, legaMoves => array of all legal moves of the square

    for (const legalMove of allLegalMoves) {   // for each object
        for (const move of legalMove.legalMoves) {   // for each legal move of piece
            
            const previewedBoard = previewBoard(legalMove.initial, legalMove.position, move)   // make preview of the board after move

            if (!isCheck(previewedBoard, color)) {
                legalMoves.push({position: legalMove.position, piece: legalMove.initial, move: move})
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