function onEnPassantforWhite(moveHistory) {
  let lastMove = moveHistory[moveHistory.length - 1];
  let secondLastMove = moveHistory[moveHistory.length - 2];

  if (lastMove === undefined || secondLastMove === undefined) {
    return;
  }

  let secondStartPosition = secondLastMove.start;
  let secondEndPosition = secondLastMove.end;
  let secondStartRow = secondStartPosition[2];
  let secondEndRow = secondEndPosition[2];
  let secondCol = secondStartPosition[1];
  let secondDeltaRow = secondStartRow - secondEndRow;

  if (secondLastMove.end[0] === "p" && Math.abs(secondDeltaRow) === 2) {
    let startPosition = lastMove.start;
    let endPosition = lastMove.end;
    let endPositionRow = endPosition[2];
    let deltaRow = endPositionRow - secondEndRow;
    let endCol = endPosition[1];

    if (
      endCol === secondCol &&
      lastMove.end[0] === "P" &&
      Math.abs(deltaRow) === 1
    ) {
      let passantResults = [];
      passantResults.push(true);
      let passantId = `${secondCol}${secondEndRow}`;
      passantResults.push(passantId);

      return passantResults;
    }
  }
}
export { onEnPassantforWhite };

function onEnPassantforBlack(moveHistory) {
  let lastMove = moveHistory[moveHistory.length - 1];
  let secondLastMove = moveHistory[moveHistory.length - 2];

  if (lastMove === undefined || secondLastMove === undefined) {
    return;
  }

  let secondStartPosition = secondLastMove.start;
  let secondEndPosition = secondLastMove.end;
  let secondStartRow = secondStartPosition[2];
  let secondEndRow = secondEndPosition[2];
  let secondCol = secondStartPosition[1];
  let secondDeltaRow = secondStartRow - secondEndRow;

  if (secondLastMove.end[0] === "P" && Math.abs(secondDeltaRow) === 2) {
    let startPosition = lastMove.start;
    let endPosition = lastMove.end;
    let endPositionRow = endPosition[2];
    let deltaRow = endPositionRow - secondEndRow;
    let endCol = endPosition[1];

    if (
      endCol === secondCol &&
      lastMove.end[0] === "p" &&
      Math.abs(deltaRow) === 1
    ) {
      let passantResults = [];
      passantResults.push(true);
      let passantId = `${secondCol}${secondEndRow}`;
      passantResults.push(passantId);

      return passantResults;
    }
  }
}
export { onEnPassantforBlack };
