import { isCheck } from "./isCheck.js"
import { getAllLegalMovesWithCheck } from "./getAllLegalMovesWithCheck.js"

export function isStalemate(board, color) {
    if (getAllLegalMovesWithCheck(board, color).length === 0 && !isCheck(board, color)) {
        return true
    }

    return false
}