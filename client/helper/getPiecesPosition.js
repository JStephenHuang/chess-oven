const squareDivs = document.getElementsByClassName("square")

//
function getPiecesPosition() {
    const piecesPosition = [[],[],[],[],[],[],[],[]]

    // initialize 8 empty arrays

    // array of all 64 square divs
    const squares = Array.from(squareDivs)

    for (let i = 0; i < 64; i ++) { // piecesPosition = [[0,1,2,3,4,5,6,7], [8,9,10,11, etc]]
        const square = squares[i] // individual square div
        const row = Math.floor(i/8) 
        if (square.hasChildNodes()) {
            piecesPosition[row].push(square.childNodes[0].id)
        } else {
            piecesPosition[row].push("")
        }
    }
    
    return piecesPosition
}

// piecesPosition.reverse() -> [
// row 8 -> [r,n,b,q,k,b,n,r], index: 7
// row 7 -> [p,p,p,p,p], index: 6
// row 6 -> ['''''''''], index: 5
// row 5 -> ['''''''''], index: 4
// row 4 -> ['''''''''], index: 3
// row 3 -> ['''''''''], index: 2
// row 2 -> [P,P,P,P,P,P,P,P], index: 1
// row 1 -> [R,N,B,Q,K,B,N,R], index: 0
// white 

export { getPiecesPosition }