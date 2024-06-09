function checkEnPassant(moveHistory, pawn, oppPawn, startRow) {
  if (moveHistory.length < 3) {
    return;
  }
  const lastMove = moveHistory[moveHistory.length - 1];
  const secondLastMove = moveHistory[moveHistory.length - 2];

  const secondStartPosition = secondLastMove.start;
  const secondStartRow = secondStartPosition[2];
  const secondEndRow = secondLastMove.end[2];
  const secondCol = secondStartPosition[1];
  const secondDeltaRow = secondStartRow - secondEndRow;

  if (secondLastMove.end[0] === pawn && Math.abs(secondDeltaRow) === 2) {
    const endPosition = lastMove.end;
    const endPositionRow = endPosition[2];
    const deltaRow = Math.abs(endPositionRow - secondEndRow);
    const endCol = endPosition[1];

    if (
      endCol === secondCol &&
      lastMove.end[0] === oppPawn &&
      deltaRow === 1 &&
      lastMove.start[2] === startRow
    ) {
      const passantId = `${secondCol}${secondEndRow}`;
      const passantSquare = document.getElementById(passantId);
      passantSquare.innerHTML = "";
      return;
    }
  }
}

export function onEnPassant(moveHistory) {
  checkEnPassant(moveHistory, "p", "P", "4");
  checkEnPassant(moveHistory, "P", "p", "3");
}

