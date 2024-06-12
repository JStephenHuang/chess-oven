function checkEnPassant(moveHistory, pawn, oppPawn, startRow) {
  if (moveHistory.length < 3) {
    return;
  }

  const lastMove = moveHistory[moveHistory.length - 1];
  const secondLastMove = moveHistory[moveHistory.length - 2];

  const pieceInitial = secondLastMove.initial;
  const oppInitial = lastMove.initial;
  const secondStartPosition = secondLastMove.start;
  const secondStartRow = secondStartPosition[1];
  const secondEndRow = secondLastMove.end[1];
  const secondCol = secondStartPosition[0];
  const secondDeltaRow = Math.abs(secondStartRow - secondEndRow);

  if (pieceInitial === pawn && secondDeltaRow === 2) {
    const endPosition = lastMove.end;
    const endPositionRow = endPosition[1];
    const deltaRow = Math.abs(endPositionRow - secondEndRow);
    const endCol = endPosition[0];

    if (
      endCol === secondCol &&
      oppInitial === oppPawn &&
      deltaRow === 1 &&
      lastMove.start[1] === startRow
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
