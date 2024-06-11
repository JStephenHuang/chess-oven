import { isLegalMove } from "../helper/isLegalMove.js";
import { onCastle } from "../helper/onCastle.js";
import { moveHistory } from "../helper/onClick.js";
import { isShortWhiteCastle } from "../helper/onCastle.js";
import { isLongWhiteCastle } from "../helper/onCastle.js";
import { isShortBlackCastle } from "../helper/onCastle.js";
import { isLongBlackCastle } from "../helper/onCastle.js";
export function getKingLegalMoves(initial, position, board) {
  const legalMoves = [];
  const { row, col } = position;

  const kingMoves = [
    // defining moves for the king
    { row: 1, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: -1 },
    { row: 0, col: 1 },
    { row: 0, col: -1 },
    { row: -1, col: 1 },
    { row: -1, col: 0 },
    { row: -1, col: -1 },
  ];

  for (const move of kingMoves) {
    isLegalMove(initial, board, row + move.row, col + move.col, legalMoves);
  }
  onCastle(moveHistory, board);
  isShortWhiteCastle(moveHistory, board, initial, legalMoves);
  isLongWhiteCastle(moveHistory, board, initial, legalMoves);
  isShortBlackCastle(moveHistory, board, initial, legalMoves);
  isLongBlackCastle(moveHistory, board, initial, legalMoves);
  return legalMoves;
}
