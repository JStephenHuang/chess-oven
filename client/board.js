import { onClick } from "./helper/onClick.js";
import { Piece } from "./models/Piece.js";
import { getPiecesPosition } from "./helper/getPiecesPosition.js";

const board = document.getElementById("board")

const cols = ["a" ,"b", "c", "d", "e", "f", "g", "h"]

function createBoard () {
    // const squares = []

    for (let i = 8; i > 0; i --) {
        // const row = []

        for (let j = 0; j < 8; j ++) {
            const id = `${cols[j]}${i}`
            // row.push(id);
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
        // squares.push(row)
    }
    
    // return squares
}

createBoard()

function setBoard () {
    const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

    const rows = initialPosition.split('/')
    // rows = ['rnbqkbnr', 'pppppppp','8','8','8',RNBQKBNR...]

    let rowNumber = 8

    for (const row of rows) {  // looping row in rows -> 'rnbqkbnr'
        
        for (let i = 0; i < 8; i ++) {
            const initial = row[i]
            if (initial === "8") break;

            const piece = new Piece(initial)
    
            const img = document.createElement("img")
            img.src = `/client/assets/${piece.img}`
            img.setAttribute("id", initial)
            img.classList.add('piece')
            
            const id = `${cols[i]}${rowNumber}`
    
            const square = document.getElementById(id)
    
            square.appendChild(img)

        }
        
        rowNumber -= 1
    }

}

setBoard()
