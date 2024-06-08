import { getPiecesPosition } from "./getPiecesPosition.js"

export function previewBoard(initial, start, end) {
    const board = getPiecesPosition().reverse()

    console.log(`start: ${start} end: ${end}`)

    board[end[1]][end[0]] = initial
    board[start[1]][start[0]] = ""

    return board
}