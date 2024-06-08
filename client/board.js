import { onClick } from "./helper/onClick.js";
import { Piece } from "./models/Piece.js";
import { getPiecesPosition } from "./helper/getPiecesPosition.js";

const board = document.getElementById("board")

const cols = "abcdefgh"

// 11 (column, row)
// board will be organized as a cartesian map: a1 -> '00', h8 -> '77'

function createBoard () {
    for (let i = 7; i >= 0; i --) { // for i rows:
        for (let j = 0; j < 8; j ++) {  // for j cols
            const id = `${j}${i}`
            
            const squareDiv = document.createElement("div");
            squareDiv.setAttribute('class', "square");

            // setting square color
            if ((i + j) % 2 === 0) {    
                squareDiv.classList.add("white");

            } else {
                squareDiv.classList.add("black");
            }
            
            squareDiv.setAttribute('id', id);
            squareDiv.addEventListener("click", event => onClick(event))
            
            board.appendChild(squareDiv);
            
        }
    }
}

createBoard()

function setBoard () {
    const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

    const rows = initialPosition.split('/')
    // rows = ['rnbqkbnr', 'pppppppp','8','8','8',RNBQKBNR...]

    let rowNumber = 7

    for (const row of rows) {  // looping row in rows -> 'rnbqkbnr'
        
        for (let i = 0; i < 8; i ++) {
            const initial = row[i]
            if (initial === "8") break;

            const piece = new Piece(initial)
    
            const img = document.createElement("img")
            img.setAttribute("src", `/client/assets/${piece.img}`)
            img.setAttribute("id", initial)
            img.classList.add('piece')
            
            const id = `${i}${rowNumber}`
    
            const square = document.getElementById(id)
    
            square.appendChild(img)
        }
        rowNumber -= 1
    }
}

setBoard()
