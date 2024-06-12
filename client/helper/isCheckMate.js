import { getAllLegalMovesWithCheck } from "./getAllLegalMovesWithCheck.js"

export function isCheckMate(board, color) { // if color -> black, sees if black is checkmated.

    return getAllLegalMovesWithCheck(board, color).length === 0
}