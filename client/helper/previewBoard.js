import { getPiecesPosition } from "./getPiecesPosition.js"

export function previewBoard(initial, start, end) {
    const board = getPiecesPosition().reverse()

    board[start[1]][start[0]] = ""
    board[end[1]][end[0]] = initial

    return board
}
