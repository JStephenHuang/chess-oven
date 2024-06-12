import { isLegalMove } from "../helper/isLegalMove.js";
import { onCastle } from "../helper/checkCastle.js";
import { moveHistory } from "../helper/onClick.js";
import { checkShortWhiteCastle } from "../helper/checkCastle.js";
import { checkLongWhiteCastle } from "../helper/checkCastle.js";
import { checkShortBlackCastle } from "../helper/checkCastle.js";
import { checkLongBlackCastle } from "../helper/checkCastle.js";
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
  // checking for castling
  
  checkShortWhiteCastle(moveHistory, board, initial, legalMoves);
  checkLongWhiteCastle(moveHistory, board, initial, legalMoves);
  checkShortBlackCastle(moveHistory, board, initial, legalMoves);
  checkLongBlackCastle(moveHistory, board, initial, legalMoves);

  console.log(moveHistory)
  return legalMoves;
}
