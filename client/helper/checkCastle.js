import { previewBoard } from "./previewBoard.js";
import { moveHistory } from "../helper/onClick.js";
import { isCheck } from "./isCheck.js";
import { addMove, focused, unselectSquare, selectSquare } from "../helper/onClick.js";


export function checkCastle(pieceInitial, focusedSquare, targetSquare) {
  if (pieceInitial !== "k" && pieceInitial !== "K") return false

  if (!getLegalCastles(pieceInitial).includes(targetSquare.id)) return false

  // if its a legal castle, move the king to targetSquare, add to moveHistory, call initiateCastle
  addMove(
    `${focusedSquare.childNodes[0].id}`,
    `${focusedSquare.id}`,
    `${targetSquare.id}`
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
  for (let i = 5; i <= 6; i ++) {
 
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

    if (isCheck(isWhite ? "white" : "black", previewedBoard)) {
      shortCastleArray.push(false)
      break
    }
    shortCastleArray.push(true)
  }

  // long

  for (let i = 3; i <= 2; i --) {
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
    
    if (isCheck(isWhite ? "white" : "black", previewedBoard)) {
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

  return legalCastles
} 

export function checkShortWhiteCastle(moveHistory, Board, initial, legalMoves) {
  //short white castle
  const f1 = "50"; // final position rook
  const g1 = "60"; // final position king

  const f1Square = document.getElementById(f1);
  const g1Square = document.getElementById(g1);


  // long white castle

  moveHistory.forEach((move) => {   // checks moveHistory for any white king moves, h-rook moves, and if g1 + f1 are empty
    if (    
      move.start !== "70" &&
      move.start != "40" &&
      f1Square.innerHTML === "" &&
      g1Square.innerHTML === "" &&
      initial === "K"
    ) {
      legalMoves.push("60");
    }
  });
}
export function checkLongWhiteCastle(moveHistory, board, initial, legalMoves) {
  const b1 = "10";
  const c1 = "20";
  const d1 = "30";
  const b1Square = document.getElementById(b1);
  const c1Square = document.getElementById(c1);
  const d1Square = document.getElementById(d1);
  moveHistory.forEach((move) => {
    if (
      move.start !== "00" &&
      move.start != "40" &&
      b1Square.innerHTML === "" &&
      c1Square.innerHTML === "" &&
      d1Square.innerHTML === "" &&
      initial === "K"
    ) {
      legalMoves.push("20");
    }
  });
}

export function checkShortBlackCastle(moveHistory, board, initial, legalMoves) {
  //short white castle
  const f8 = "57";
  const g8 = "67";
  const f1Square = document.getElementById(f8);
  const g1Square = document.getElementById(g8);

  // long white castle

  moveHistory.forEach((move) => {
    if (
      move.start !== "77" &&
      move.start != "47" &&
      f1Square.innerHTML === "" &&
      g1Square.innerHTML === "" &&
      initial === "k"
    ) {
      legalMoves.push("67");
    }
  });
}

export function checkLongBlackCastle(moveHistory, board, initial, legalMoves) {
  const b8 = "17";
  const c8 = "27";
  const d8 = "37";
  const b8Square = document.getElementById(b8);
  const c8Square = document.getElementById(c8);
  const d8Square = document.getElementById(d8);
  moveHistory.forEach((move) => {
    if (
      move.start !== "00" &&
      move.start != "40" &&
      b8Square.innerHTML === "" &&
      c8Square.innerHTML === "" &&
      d8Square.innerHTML === "" &&
      initial === "k"
    ) {
      legalMoves.push("27");
    }
  });
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