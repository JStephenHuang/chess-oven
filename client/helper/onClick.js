import { rotate } from "../board/rotateBoard.js";
import { getLegalMoves } from "./getLegalMoves.js";
import { getThreatenedPieces } from "./getThreatenedPieces.js";
import { isCheck } from "./isCheck.js";
import { isTurn } from "./isTurn.js";
import { onEnPassantforWhite } from "./onEnPassant.js";
import { onEnPassantforBlack } from "./onEnPassant.js";

const focused = []; // contains selected square element, or empty if nothing selected
export let moveHistory = [];
function addMove(startPosition, endPosition) {
  moveHistory.push({
    start: startPosition,
    end: endPosition,
  });
}

// selecting a square
function selectSquare(targetSquare) {
  if (targetSquare.innerHTML === "") return; // if square is empty: return

  getThreatenedPieces(targetSquare);
  focused.push(targetSquare);
  targetSquare.classList.add("selected");
}
// moving a piece
function movePiece(focusedSquare, targetSquare) {
  if (focusedSquare.id === targetSquare.id) {
    // if user selected the same square, unselect it
    focusedSquare.classList.remove("selected");
    focused.pop();
  } else {
    // if user valid target square

    // check if the move is legal

    const legalMoves = getLegalMoves(focusedSquare);

    if (
      !legalMoves.includes(targetSquare.id) ||
      !isTurn(moveHistory, focusedSquare) ||
      isCheck(focusedSquare)
    ) {
      // if not legal move or not your turn
      // if not a legal move
      if (targetSquare.innerHTML === "") {
        // empty square
        unselectSquare(focusedSquare);
      } else {
        unselectSquare(focusedSquare);
        selectSquare(targetSquare);
      }
    } else {
      // make the move

      // moveHistory.push(`${focusedSquare.childNodes[0].id}${targetSquare.id}`);
      addMove(
        `${focusedSquare.childNodes[0].id}${focusedSquare.id}`,
        `${focusedSquare.childNodes[0].id}${targetSquare.id}`
      );
      let startSquare = `${focusedSquare.childNodes[0].id}${focusedSquare.id}`;
      let endSquare = `${focusedSquare.childNodes[0].id}${targetSquare.id}`;

      if (moveHistory !== "") {
        onEnPassantforWhite(moveHistory);
      }
      if (moveHistory !== "") {
        onEnPassantforBlack(moveHistory);
      }

      targetSquare.innerHTML = focusedSquare.innerHTML; // piece moves to target square
      focusedSquare.innerHTML = ""; // remove piece from old square
      focused.push(targetSquare);
      targetSquare.classList.add("selected");

      // rotate()
    }
  }
}

function unselectSquare(focusedSquare) {
  focusedSquare.classList.remove("selected");
  focused.pop();
}

export function onClick(event) {
  const targetSquare = event.target; // new selected square

  // if no square selected
  if (focused.length === 0) {
    selectSquare(targetSquare);

    // display legal squares
  }

  // if there is already a selected square
  else if (focused.length === 1) {
    const focusedSquare = focused[0]; // our old square

    movePiece(focusedSquare, targetSquare);
  }

  // if there are two squares selected:
  else if (focused.length === 2) {
    // unselect old squares
    const oldFocusedSquare = focused[0];
    const oldSelectedSquare = focused[1];
    unselectSquare(oldFocusedSquare);
    unselectSquare(oldSelectedSquare);

    // select new square only if square has piece
    selectSquare(targetSquare);
  }
}
