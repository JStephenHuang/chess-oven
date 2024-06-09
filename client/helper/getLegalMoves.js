import { getPiecesPosition } from "./getPiecesPosition.js";
import { getPawnLegalMoves } from "../pieceLegalMoves/pawn.js";
import { getBishopLegalMoves } from "../pieceLegalMoves/bishop.js";
import { getKnightLegalMoves } from "../pieceLegalMoves/knight.js";
import { getRookLegalMoves } from "../pieceLegalMoves/rook.js";
import { getKingLegalMoves } from "../pieceLegalMoves/king.js";
import { getQueenLegalMoves } from "../pieceLegalMoves/queen.js";

// takes in a selected (focused) square with a piece on it, returns all legal moves
export function getLegalMoves(focusedSquare, board) {

  // onCheck => if check return another set of array instead of the legal move below

  const pieceInitial = focusedSquare.childNodes[0].id; // p, r, k, n, q

  const position = {
    row: parseInt(focusedSquare.id[1]),
    col: parseInt(focusedSquare.id[0]),
  }; // {row: 1, col: 2}

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
  
  return getLegalMovesMap[pieceInitial](pieceInitial, position, board);
}


export function getAllLegalMoves(board, color) {
  const legalMoves = []

  for (let i = 0; i < 8; i ++) { 
    const row = board[i]  

    for (let j = 0; j < 8; j ++) {
        const initial = row[j]

         if (initial !== '') {
          const initialColor = color === "white" ? initial.toUpperCase() : initial.toLowerCase()
          
          if (initial === initialColor) {
              const id = `${j}${i}`
              const squareDiv = document.getElementById(id);
              legalMoves.push({initial: initial, position: id, legalMoves: getLegalMoves(squareDiv, board)});
          }
        }
    }
  }

  return legalMoves
}