export function isTurn(moveHistory, focusedSquare) {
    const pieceInitial = focusedSquare.childNodes[0].id
    const color = pieceInitial === pieceInitial.toUpperCase() ? "white" : "black"  // 'black' || 'white'
    
    return ((moveHistory.length % 2 === 0 && color === "white") || (moveHistory.length % 2 === 1 && color === 'black')) 
  // movehistory -> 2, color -> white, TRUE
  // movehistory -> 1, color -> black,  TRUE
  // movehistory -> 1, color -> white, FALSE
  // movehistory => 2, color => black, FALSE
}