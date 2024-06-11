import { isLegalMove } from "../helper/isLegalMove.js";
import { moveHistory } from "../helper/onClick.js";
import { isShortWhiteCastle } from "../helper/onCastle.js";
import { isLongWhiteCastle } from "../helper/onCastle.js";
import { isShortBlackCastle } from "../helper/onCastle.js";
import { isLongBlackCastle } from "../helper/onCastle.js";
export function getRookLegalMoves(initial, position, board) {
  const { row, col } = position;
  const legalMoves = [];

  const rookDirections = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ];

  const rookMoves = [];
  // find limits of rook moves
  for (const direction of rookDirections) {
    // for each direction
    let counter = 1;

    while (
      row + counter * direction.y < 8 &&
      row + counter * direction.y >= 0 &&
      col + counter * direction.x >= 0 &&
      col + counter * direction.x < 8
    ) {
      const targetRow = row + counter * direction.y;
      const targetCol = col + counter * direction.x;

      rookMoves.push({ targetRow: targetRow, targetCol: targetCol });

      if (board[targetRow][targetCol] !== "") {
        break;
      }
      counter++;
    }
  }

  for (const move of rookMoves) {
    isLegalMove(initial, board, move.targetRow, move.targetCol, legalMoves);
  }
  isShortWhiteCastle(moveHistory, board);
  isLongWhiteCastle(moveHistory, board);
  isShortBlackCastle(moveHistory, board);
  isLongBlackCastle(moveHistory, board);
  return legalMoves;
}
