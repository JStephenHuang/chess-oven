import { isCheck } from "./isCheck.js"
import { getAllLegalMovesOnCheck } from "./getAllLegalMovesOnCheck.js"

export function isStalemate(board, color) {
    if (getAllLegalMovesOnCheck(board, color).length === 0 && !isCheck(board, color)) {
        return true
    }

    return false
}