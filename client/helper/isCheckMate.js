import { getAllLegalMovesOnCheck } from "./getAllLegalMovesOnCheck.js"

export function isCheckMate(board, color) { // if color -> black, sees if black is checkmated.

    return getAllLegalMovesOnCheck(board, color).length === 0
}