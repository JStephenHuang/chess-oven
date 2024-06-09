import { getLegalMoves } from "./getLegalMoves.js";
import { getPiecesPosition } from "./getPiecesPosition.js";
import {
  getThreatenedPieces,
  getAllThreatenedPieces,
} from "./getThreatenedPieces.js";

export function isCheck(focusedSquare) {
  // takes in a focused sqaure with a piece. If a white piece is selected, returns true if white in check or if a black piece is selected and black king in check. False if king not in check
  const pieceInitial = focusedSquare.childNodes[0].id;

  const color = pieceInitial === pieceInitial.toUpperCase() ? "white" : "black";

  const piecesPosition = getPiecesPosition();

  // iterating thru the board

  const allThreatenedPieces = getAllThreatenedPieces(piecesPosition, color); // pieces threatened by the opponent

  for (const threatenedPiece of allThreatenedPieces) {
    // threatenedPiece => {position: 00, piece: "R"}
    return threatenedPiece.piece === "k" || threatenedPiece.piece === "K";
  }
}

// iterate thru opponents pieces
// get all arrays of legal moves
// check if your own king is inside any of the arrays
// if so -> check
// else default onClick
