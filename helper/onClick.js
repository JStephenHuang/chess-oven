let focused = []  // contains selected square element, or empty if nothing selected

export function onClick (event) {
    const targetSquare = event.target // new selected square

    console.log(targetSquare.innerHTML)


    // if no square selected
    if (focused.length === 0) {
        if (targetSquare.innerHTML === '') return  // if square is empty: return
        
        focused.push(targetSquare)
        targetSquare.classList.add("selected")
    }

    // if there is already a selected square
    else if (focused.length === 1) {   
        const focusedSquare = focused[0]  // our old square

        if (focusedSquare.id === targetSquare.id) {  // if user selected the same square, unselect it
            focusedSquare.classList.remove("selected") 
            focused.pop()
            
        } else {    // if user valid target square
            targetSquare.innerHTML = focusedSquare.innerHTML // piece moves to target square
            focusedSquare.innerHTML = ""    // remove piece from old square
            focused.push(targetSquare)
            targetSquare.classList.add("selected")
        }
    }

    // if there are two squares selected: 
    else if (focused.length === 2) {  // unselect old squares
        const oldFocusedSquare = focused[0]
        const oldSelectedSquare = focused[1]
        oldFocusedSquare.classList.remove("selected")
        oldSelectedSquare.classList.remove("selected")
        focused = []

        // select new square only if square has piece
        if (targetSquare.innerHTML === '') return
        focused.push(targetSquare)
        targetSquare.classList.add("selected")
        
    }
    console.log(focused)
}
