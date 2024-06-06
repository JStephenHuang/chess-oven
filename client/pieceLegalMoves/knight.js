import { isLegalMove } from "../helper/isLegalMove.js";

export function getKnightLegalMoves(initial, position, board) {
    const legalMoves = [];
    const { row , col } = position

    const knightMoves = [  // defining moves for the knight (all possible L-shapes)
        { row: 2, col: -1 }, { row: 2, col: 1 },
        { row: -2, col: -1 }, { row: -2, col: 1 },
        { row: 1, col: -2 }, { row: 1, col: 2 },
        { row: -1, col: -2 }, { row: -1, col: 2 }
    ];

    for (const move of knightMoves) {
        isLegalMove(initial, board, row + move.row, col + move.col, legalMoves);
    }

    return legalMoves;
}