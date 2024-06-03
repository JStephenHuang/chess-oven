const cols = ["a" ,"b", "c", "d", "e", "f", "g", "h"]

export function getPawnLegalMoves(initial, position, board) {
    const { row, col } = position // col -> 1,  row -> 2     => b2
    const legalMoves = []

    
    if (initial === "P")  {
        const indexRow = row - 1
        const front = board[indexRow + 1][col]
        
        if (col >= 1 && col <= 7) {  // checking to see if columns in range
          const diagonalLeft = board[indexRow + 1][col - 1]
          if (diagonalLeft !== "" && diagonalLeft !== diagonalLeft.toUpperCase()) {
              legalMoves.push(`${cols[col - 1]}${row + 1}`)
          }
        }
        if (col >= 0 && col <= 6) {
          const diagonalRight = board[indexRow + 1][col + 1]
          if (diagonalRight !== "" && diagonalRight !== diagonalRight.toUpperCase()) {
              legalMoves.push(`${cols[col + 1]}${row + 1}`)
          }
        }

        if (front === "") {
            legalMoves.push(`${cols[col]}${row + 1}`)
            if (row === 2) {
              legalMoves.push(`${cols[col]}${row + 2}`)
            }
        }
    }

    if (initial === "p")  {
        const indexRow = row - 1
        const front = board[indexRow - 1][col]
        
        if (col >= 1 && col <= 7) {  // checking to see if columns in range
            const diagonalLeft = board[indexRow - 1][col - 1]
            if (diagonalLeft !== "" && diagonalLeft !== diagonalLeft.toLowerCase()) {
                legalMoves.push(`${cols[col - 1]}${row - 1}`)
            }
          }
          if (col >= 0 && col <= 6) {
            const diagonalRight = board[indexRow - 1][col + 1]
            if (diagonalRight !== "" && diagonalRight !== diagonalRight.toLowerCase()) {
                legalMoves.push(`${cols[col + 1]}${row - 1}`)
            }
          }

        if (front === "") {
            legalMoves.push(`${cols[col]}${row - 1}`)
            if (row === 7) {
                legalMoves.push(`${cols[col]}${row - 2}`)
              }
        }
    }
    return legalMoves

}