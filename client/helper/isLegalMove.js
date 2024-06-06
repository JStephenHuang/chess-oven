import { isDifferentColor } from "./isDifferentColor.js";

// for knight and king, their moves are set (unlike rook or bishop which moves can range across the entire board)
// we can hardcode the valid moves, then append if it is within the bounds of the board
export function isLegalMove(initial, board, targetRow, targetCol, legalMoves) {

    if (targetRow >= 0 && targetRow <= 7 && targetCol >= 0 && targetCol <= 7) {
        const targetSquare = board[targetRow][targetCol];
        if (targetSquare === "" || isDifferentColor(initial, targetSquare)) {
            legalMoves.push(`${targetCol}${targetRow}`);
        }
    }
}