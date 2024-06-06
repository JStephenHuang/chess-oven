export function isDifferentColor(initial, piece) {
    // returns true if its a different color
    if (initial === initial.toUpperCase()) { // white
        return piece !== piece.toUpperCase() // true if piece is lowercase (black)
    } else { // black
        return piece !== piece.toLowerCase() // true if piece is uppercase (white)

    }
}
