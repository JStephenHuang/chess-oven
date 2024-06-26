const cols = "abcdefgh";

export function displayTurn(moveHistory) {
  const turnParagraphElement = document.getElementById("turn");
  if (moveHistory.length % 2 === 0) {
    turnParagraphElement.innerHTML = "White";
  } else {
    turnParagraphElement.innerHTML = "Black";
  }
}

// div element of the move log => id: move-history

export function displayMoveHistory(moveHistory) {
  console.log(moveHistory.length - 1);

  const { initial, end, type } = moveHistory[moveHistory.length - 1];

  const moveHistoryContainer = document.getElementById("move-history");

  const moveParagraphElement = document.createElement("p");
  moveParagraphElement.style = "width: 33%; margin: 0;";

  const isWhite = initial.toUpperCase() === initial;
  const rowNumber = Math.ceil(moveHistory.length / 2);
  const moveId = `row${rowNumber}`;

  const endSquare = convertToChessNotation(end);

  let moveString = `${getPieceSymbol(initial)}*${endSquare}`;

  console.log(type);

  if (type === "castle") {
    moveString = end[0] === "2" ? "O-O-O" : "O-O";
  }

  if (type === "check") {
    moveString += "+";
  } else if (type === "checkmate") {
    moveString += "#";
  } else if (type === "stalemate") {
    moveString += "$";
  }
  // capture
  if (type[0] === "x") {
    moveString = moveString.replace("*", "x");
  } else {
    moveString = moveString.replace("*", "");
  }

  moveParagraphElement.innerHTML = moveString;

  if (isWhite) {
    const moveRow = document.createElement("div");
    const rowNumberParagraphElement = document.createElement("p");
    moveRow.style = "display: flex; width: 100%; align-items: center;";
    moveRow.id = moveId;

    rowNumberParagraphElement.innerHTML = rowNumber;
    rowNumberParagraphElement.style = "margin-right: 0.25rem";
    moveRow.appendChild(rowNumberParagraphElement);
    moveRow.appendChild(moveParagraphElement);
    moveHistoryContainer.appendChild(moveRow);

    moveHistoryContainer.scrollTo(0, moveHistoryContainer.scrollHeight);
  } else {
    // same row
    document.getElementById(moveId).appendChild(moveParagraphElement);
  }
}
function convertToChessNotation(position) {
  const col = cols[position[0]];
  const row = 8 - parseInt(position[1]); // Convert 0-7 to 8-1
  return `${col}${row}`;
}

function getPieceSymbol(initial) {
  const symbols = {
    K: "♔",
    Q: "♕",
    R: "♖",
    B: "♗",
    N: "♘",
    P: "♙",
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟",
  };
  return symbols[initial] || initial;
}
