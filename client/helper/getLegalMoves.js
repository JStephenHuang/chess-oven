import { getPiecesPosition } from "./getPiecesPosition.js"
import { getPawnLegalMoves } from "../pieceLegalMoves/pawn.js"
import { getKnightLegalMoves } from "../pieceLegalMoves/knight.js"

const cols = ["a" ,"b", "c", "d", "e", "f", "g", "h"]

export function getLegalMoves(focusedSquare) {
  const pieceInitial = focusedSquare.childNodes[0].id   // p, r, k, n, q
  const position = {row: parseInt(focusedSquare.id[1]), col: cols.indexOf(focusedSquare.id[0])} // {row: 1, col: 2}
  const piecesPosition = getPiecesPosition()
  
  if (pieceInitial === 'p' || pieceInitial === 'P') {
    return getPawnLegalMoves(pieceInitial, position, piecesPosition)
  } 
  // else if (pieceInitial === 'r' || pieceInitial === 'R') {
  //   return getRookLegalMoves(pieceInitial, position, piecesPosition)
  // } 
  else if (pieceInitial === 'n' || pieceInitial === 'N') {
    return getKnightLegalMoves(pieceInitial, position, piecesPosition)
  }
  //  else if (pieceInitial === 'b' || pieceInitial === 'B') {
  //   return getBishopLegalMoves(pieceInitial, position, piecesPosition)
  // } else if (pieceInitial === 'q' || pieceInitial === 'Q') {
  //   return getQueenLegalMoves(pieceInitial, position, piecesPosition)
  // } else if (pieceInitial === 'k' || pieceInitial === 'K') {
  //   return getKingLegalMoves(pieceInitial, position, piecesPosition) 
  // }
}

