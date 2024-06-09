import { getAllLegalMovesOnCheck } from "./getAllLegalMovesOnCheck.js"

export function isCheckMate(color, board) { // if color -> black, sees if black is checkmated.

    return getAllLegalMovesOnCheck(color, board).length === 0
}