const cols = ["a" ,"b", "c", "d", "e", "f", "g", "h"]

function differentColor(initial, piece) {
    // returns true if its a different color
    if (initial === initial.toUpperCase()) { // white
        return piece !== piece.toUpperCase() // true if piece is lowercase (black)
    } else { // black
        return piece !== piece.toLowerCase() // true if piece is uppercase (white)

    }
}

export function getKnightLegalMoves(initial, position, board) {
    const { row, col } = position
    const legalMoves = []

    // vertical L

    // left
    if (col >= 1 && col <= 7) {
        // top
        if (row >= 1 && row <= 6) {
            const topLeft = board[row + 1][col - 1]

            if (topLeft === "" || differentColor(initial, topLeft)) {
                legalMoves.push(`${cols[col - 1]}${row + 2}`)
            }
        }
        // bot
        if (row >= 3 && row <= 8) {
            const botLeft = board[row - 3][col - 1]
            
            if (botLeft === "" || differentColor(initial, botLeft)) {
                legalMoves.push(`${cols[col - 1]}${row - 2}`)
            }
        }
    }
    // right
    if (col >= 0 && col <= 6) {
        if (row >= 1 && row <= 6) {
            const topRight = board[row + 1][col + 1]

            if (topRight === "" || differentColor(initial, topRight)) {
                legalMoves.push(`${cols[col + 1]}${row + 2}`)
            }
        }

        if (row >= 3 && row <= 8) {
            const botRight = board[row - 3][col + 1]
              
            if (botRight === "" || differentColor(initial, botRight)) {
                legalMoves.push(`${cols[col + 1]}${row - 2}`)
            }
        }
    }
    // horizontal L

    // top
    if (row >= 1 && row <= 7) {
        // left 
        if (col >= 2 && col <= 7) {
            const topLeft = board[row][col - 2]
            if (topLeft === "" || differentColor(initial, topLeft)) {
                legalMoves.push(`${cols[col - 2]}${row + 1}`)
            }
        }
        // right
        if (col >= 0 && col <= 5) {
            const topRight = board[row][col + 2]

            if (topRight === "" || differentColor(initial, topRight)) {
                legalMoves.push(`${cols[col + 2]}${row + 1}`)
            }
        }
    }
    // bottom
    if (row >= 2 && row <= 8) {
        // left 
        if (col >= 2 && col <= 7) {
            const botLeft = board[row - 2][col - 2]

            if (botLeft === "" || differentColor(initial, botLeft)) {
                legalMoves.push(`${cols[col - 2]}${row - 1}`)
            }
        }
        
        // right
        if (col >= 0 && col <= 5) {
            const botLeft = board[row - 2][col + 2]

            if (botLeft === "" || differentColor(initial, botLeft)) {
                legalMoves.push(`${cols[col + 2]}${row - 1}`)
            }
        }
    }
    return legalMoves
}