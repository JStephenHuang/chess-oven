import { getPiecesPosition } from "./getPiecesPosition.js";
import { getPawnLegalMoves } from "../pieceLegalMoves/pawn.js";
import { getBishopLegalMoves } from "../pieceLegalMoves/bishop.js";
import { getKnightLegalMoves } from "../pieceLegalMoves/knight.js";
import { getRookLegalMoves } from "../pieceLegalMoves/rook.js";
import { getKingLegalMoves } from "../pieceLegalMoves/king.js";
import { getQueenLegalMoves } from "../pieceLegalMoves/queen.js";

// takes in a selected (focused) square with a piece on it, returns all legal moves
export function getLegalMoves(focusedSquare) {

  // onCheck => if check return another set of array instead of the legal move below
  
  const pieceInitial = focusedSquare.childNodes[0].id; // p, r, k, n, q

  const position = {
    row: parseInt(focusedSquare.id[1]),
    col: parseInt(focusedSquare.id[0]),
  }; // {row: 1, col: 2}

  const piecesPosition = getPiecesPosition().reverse();

  const getLegalMovesMap = {
    p: getPawnLegalMoves,
    P: getPawnLegalMoves,
    b: getBishopLegalMoves,
    B: getBishopLegalMoves,
    r: getRookLegalMoves,
    R: getRookLegalMoves,
    n: getKnightLegalMoves,
    N: getKnightLegalMoves,
    q: getQueenLegalMoves,
    Q: getQueenLegalMoves,
    k: getKingLegalMoves,
    K: getKingLegalMoves
  };
  
  return getLegalMovesMap[pieceInitial](pieceInitial, position, piecesPosition);
}
