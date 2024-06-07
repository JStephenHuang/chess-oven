import { getRookLegalMoves } from "./rook.js";
import { getBishopLegalMoves } from "./bishop.js";

export function getQueenLegalMoves(initial, position, board) {
    const straightMoves = getRookLegalMoves(initial, position, board)
    const diagonalMoves = getBishopLegalMoves(initial, position, board)
    
    return straightMoves.concat(diagonalMoves)
}