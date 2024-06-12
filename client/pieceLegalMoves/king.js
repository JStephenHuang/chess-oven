import { isLegalMove } from "../helper/isLegalMove.js";
import { moveHistory } from "../helper/onClick.js";
import { checkShortWhiteCastle } from "../helper/checkCastle.js";
import { checkLongWhiteCastle } from "../helper/checkCastle.js";
import { checkShortBlackCastle } from "../helper/checkCastle.js";
import { checkLongBlackCastle } from "../helper/checkCastle.js";
import { checkCastle } from "../helper/checkCastle.js";
import { getPiecesPosition } from "../helper/getPiecesPosition.js";

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

  // getKingLegalMoves -> checkCastle -> isCheck(previewBoard)to see if its legal in between -> getThreatenedPieces -> getLegal -> getKing(previewBoard), previewBoard != getCurrentBoard

  return legalMoves;
}
