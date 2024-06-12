import { moveHistory } from "./onClick.js";

// const f1 = "50";
// const g1 = "60";

export function checkShortWhiteCastle(moveHistory, Board, initial, legalMoves) {
  //short white castle
  const f1 = "50";
  const g1 = "60";

  const f1Square = document.getElementById(f1);
  const g1Square = document.getElementById(g1);

  // long white castle

  moveHistory.forEach((move) => {   // checks moveHistory for any white king moves, h-rook moves, and if g1 + f1 are
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

export function checkCastle() {
  console.log(g1Square);
}

export function onCastle(moveHistory, board) {
  console.log(moveHistory);
  // console.log(board);
  // return legal move
}


export function initiatedCastle(moveHistory) { // checks if player initiated castle, eg moved king to castling square.
  const lastMove = moveHistory[moveHistory.length-1]
  console.log(lastMove)
  const piece = lastMove.initial
  const start = lastMove.start
  const end = lastMove.end
  console.log(piece,start,end)

  if (piece === 'k' || piece === 'K') {
    if (start === '40') {                   // white 
      if (end === '60') {  // short castle
        const rookSquare = document.getElementById('70')
        rookSquare.innerHTML = ''
        const newRookSquare = document.getElementById('50')
        const img = document.createElement("img")
        img.setAttribute("src", '/client/assets/wR.png')
        img.setAttribute("id", 'R')
        img.classList.add('piece')
        newRookSquare.appendChild(img)

      } else if (end === '20') { // long castle
        const rookSquare = document.getElementById('00')
        rookSquare.innerHTML = ''
        const newRookSquare = document.getElementById('30')
        const img = document.createElement("img")
        img.setAttribute("src", '/client/assets/wR.png')
        img.setAttribute("id", 'R')
        img.classList.add('piece')
        newRookSquare.appendChild(img)
      }
    } else if (start === '47') {    // black short
      if (end === '67') {
        const rookSquare = document.getElementById('77')
        rookSquare.innerHTML = ''
        const newRookSquare = document.getElementById('57')
        const img = document.createElement("img")
        img.setAttribute("src", '/client/assets/bR.png')
        img.setAttribute("id", 'r')
        img.classList.add('piece')
        newRookSquare.appendChild(img)
      } else if (end === '27') {
        const rookSquare = document.getElementById('07')
        rookSquare.innerHTML = ''
        const newRookSquare = document.getElementById('37')
        const img = document.createElement("img")
        img.setAttribute("src", '/client/assets/bR.png')
        img.setAttribute("id", 'r')
        img.classList.add('piece')
        newRookSquare.appendChild(img)
      }
    }
    return false
  }
}

export function moveRookForCastle(moveHistory) {

}