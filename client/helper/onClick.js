import { rotate } from "../board/rotateBoard.js";
import { getLegalMoves } from "./getLegalMoves.js";
import { getPiecesPosition } from "./getPiecesPosition.js";
import { isCheck } from "./isCheck.js";
import { isCheckMate } from "./isCheckMate.js";
import { isStalemate } from "./isStalemate.js";
import { isTurn } from "./isTurn.js";
import { isCastling } from "./isCastling.js";

import { onEnPassant } from "./onEnPassant.js";
import { checkPromotion } from "./checkPromotion.js";

import { previewBoard } from "./previewBoard.js";
import { playAudio } from "./playAudio.js";
import { displayTurn, displayMoveHistory } from "./display.js";
import { isPaused } from "../board.js";
import { onGameOver } from "./onGameOver.js";

export const focused = []; // contains selected square element, or empty if nothing selected
export const moveHistory = [];

export function addMove(pieceInitial, startPosition, endPosition, moveType) {
  moveHistory.push({
    initial: pieceInitial,
    start: startPosition,
    end: endPosition,
    type: moveType,
  });
}

// selecting a square
export function selectSquare(targetSquare) {
  if (targetSquare.innerHTML === "") return; // if square is empty: return
  focused.push(targetSquare);
  targetSquare.classList.add("selected");
}

export function unselectSquare(focusedSquare) {
  focusedSquare.classList.remove("selected");
  focused.pop();
}

// moving a piece
async function movePiece(focusedSquare, targetSquare) {
  if (focusedSquare.id === targetSquare.id) {
    // if user selected the same square, unselect it
    focusedSquare.classList.remove("selected");
    focused.pop();
  } else {
    if (isPaused) return unselectSquare(focusedSquare);

    // if user valid target square

    // check if the move is legal

    // if not legal move or not your turn

    let move = "move";

    const pieceInitial = focusedSquare.childNodes[0].id;
    const color =
      pieceInitial === pieceInitial.toUpperCase() ? "white" : "black";
    const currentBoard = getPiecesPosition().reverse();

    const previewedBoard = previewBoard(
      pieceInitial,
      focusedSquare.id,
      targetSquare.id
    ); // make preview of the board after move

    if (isCastling(pieceInitial, focusedSquare, targetSquare)) {
      playAudio("castle");
      displayMoveHistory(moveHistory);

      return;
    }

    const legalMoves = getLegalMoves(focusedSquare, currentBoard);

    if (
      !legalMoves.includes(targetSquare.id) ||
      !isTurn(moveHistory, focusedSquare) ||
      isCheck(previewedBoard, color)
    ) {
      // if not legal move or not your turn or it would result in check

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
        `${focusedSquare.childNodes[0].id}`,
        `${focusedSquare.id}`,
        `${targetSquare.id}`
      );

      onEnPassant(moveHistory);

      // check for promotion
      const pieceInitial = focusedSquare.childNodes[0].id;

      await checkPromotion(pieceInitial, focusedSquare, targetSquare);

      // sound effect
      if (targetSquare.innerHTML !== "") {
        move = `x${move}`;
      }

      // Move completed
      targetSquare.innerHTML = focusedSquare.innerHTML; // piece moves to target square
      focusedSquare.innerHTML = ""; // remove piece from old square
      focused.push(targetSquare);
      targetSquare.classList.add("selected");

      const currentBoard = getPiecesPosition().reverse();
      const opponentColor = color === "white" ? "black" : "white";

      if (isCheck(currentBoard, opponentColor)) {
        if (isCheckMate(currentBoard, opponentColor)) {
          move = "checkmate";
          onGameOver(
            "Checkmate",
            `${
              color.charAt(0).toUpperCase() + color.slice(1)
            } won by checkmate.`
          );
        } else {
          move = "check";
        }
      }

      if (isStalemate(currentBoard, opponentColor)) {
        move = "stalemate";
        onGameOver(
          `Stalemate`,
          `${
            opponentColor.charAt(0).toUpperCase() + opponentColor.slice(1)
          } has no legal moves.`
        );
      }

      playAudio(move);

      moveHistory[moveHistory.length - 1].type = move;

      console.log(moveHistory);

      displayMoveHistory(moveHistory);
      displayTurn(moveHistory);
    }
  }
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
