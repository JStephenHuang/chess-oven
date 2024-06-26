import { previewBoard } from "./previewBoard.js";
import { moveHistory } from "./onClick.js";
import { isCheck } from "./isCheck.js";
import { addMove, focused } from "./onClick.js";
import { isTurn } from "./isTurn.js";


export function isCastling(initial, focusedSquare, targetSquare) {
  if (initial !== "k" && initial !== "K") return false

  if (!isTurn(moveHistory, focusedSquare)) return false

  if (!getLegalCastles(initial).includes(targetSquare.id)) return false

  // if its a legal castle, move the king to targetSquare, add to moveHistory, call initiateCastle
  addMove(
    `${focusedSquare.childNodes[0].id}`,
    `${focusedSquare.id}`,
    `${targetSquare.id}`,
    "castle"
  );

  targetSquare.innerHTML = focusedSquare.innerHTML; // piece moves to target square
  focusedSquare.innerHTML = ""; // remove piece from old square
  focused.push(targetSquare);
  targetSquare.classList.add("selected");

  initiatedCastle(moveHistory)

  return true

  }

export function getLegalCastles(initial) {
  const isWhite = initial === initial.toUpperCase()
  const legalCastles = []
  const shortCastleArray = []
  const longCastleArray = []
  

  const initialKingPosition = isWhite ? '40' : '47';
  const castlingRow = isWhite ? 0 : 7
  
  // short 
  for (let i = 4; i <= 6; i ++) {
 
    const finalKingPosition = `${i}${castlingRow}`  // '4_', '5_', '6_'
    if (i !== 4) {
      const square = document.getElementById(finalKingPosition);
      
      if (square.innerHTML !== "") {
        shortCastleArray.push(false)
        break
      }

      shortCastleArray.push(true)
    }
    
    const previewedBoard = previewBoard(initial, initialKingPosition, finalKingPosition)

    if (isCheck(previewedBoard, isWhite ? "white" : "black")) {
      shortCastleArray.push(false)
      break
    }
    shortCastleArray.push(true)
  }

  // long

  for (let i = 4; i >= 2; i --) {
    const finalKingPosition = `${i}${castlingRow}`  // '4_', '3_', '2_'
      if (i !== 4) {
        const square = document.getElementById(finalKingPosition);

        if (square.innerHTML !== "") {
          longCastleArray.push(false)
          break
        }

        longCastleArray.push(true)
      } 
    const previewedBoard = previewBoard(initial, initialKingPosition, finalKingPosition)
    
    if (isCheck(previewedBoard, isWhite ? "white" : "black")) {

      longCastleArray.push(false)
      break
    }

    longCastleArray.push(true)
  }

  if (
    !shortCastleArray.includes(false) && 
    moveHistory.filter(move => move.start === `7${castlingRow}` || move.start === `4${castlingRow}`).length === 0
  ) {
    legalCastles.push(`6${castlingRow}`)
  }

  if (
    !longCastleArray.includes(false) &&
    moveHistory.filter(move => move.start === `0${castlingRow}` || move.start === `4${castlingRow}`).length === 0
  ) {
    legalCastles.push(`2${castlingRow}`)
  }

  console.log(legalCastles, longCastleArray, shortCastleArray)

  return legalCastles
} 

export function initiatedCastle(moveHistory) {      // checks if White or Black has initiated castling, moves rook accordingly
  const lastMove = moveHistory[moveHistory.length - 1];
  const { initial, start, end } = lastMove;   // get last move info

  if (initial === 'k' || initial === 'K') {   
    const isWhite = initial === 'K';        // isWhite -> True if white, false if black

    const initialKingPosition = isWhite ? '40' : '47';
    const shortCastleKingPosition = isWhite ? '60' : '67';
    const longCastleKingPosition = isWhite ? '20' : '27';

    if (start === initialKingPosition) {
      if (end === shortCastleKingPosition) {
        // Short castling
        moveRookForCastling(isWhite, 'short');
      } else if (end === longCastleKingPosition) {
        // Long castling
        moveRookForCastling(isWhite, 'long');
      }
    }
  }
}

export function moveRookForCastling(isWhite, castleSide) {    // moves rook according to piece colors and castleSide (short or long)
  const rookInitialPosition = initialRookPosition(isWhite, castleSide); 
  const rookFinalPosition = castledRookPosition(isWhite, castleSide);  // gets rook position

  const rookInitialSquare = document.getElementById(rookInitialPosition);
  const rookFinalSquare =  document.getElementById(rookFinalPosition);

  rookFinalSquare.innerHTML = rookInitialSquare.innerHTML
  rookInitialSquare.innerHTML = '';  // empties old square
}

function initialRookPosition(isWhite, castleSide) {
  if (castleSide === 'short') {
    return isWhite ? '70' : '77';
  } else {
    return isWhite ? '00' : '07';
  }
}

function castledRookPosition(isWhite, castleSide) {
  if (castleSide === 'short') {
    return isWhite ? '50' : '57';
  } else {
    return isWhite ? '30' : '37';
  }
}