import { isLegalMove } from "../helper/isLegalMove.js";

export function getKingLegalMoves(initial, position, board) {
    const legalMoves = [];
    const { row , col } = position

    const kingMoves = [  // defining moves for the king
        { row: 1, col: 1 }, { row: 1, col: 0 }, { row: 1, col: -1 },
        { row: 0, col: 1 }, { row: 0, col: -1 },
        { row: -1, col: 1 },{ row: -1, col: 0 }, { row: -1, col: -1 }
    ];

    for (const move of kingMoves) {
        isLegalMove(initial, board, row + move.row, col + move.col , legalMoves);
    }

    return legalMoves;
}