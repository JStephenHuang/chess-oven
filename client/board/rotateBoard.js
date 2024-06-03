const rotate = () => { 
    const images = document.getElementsByClassName("piece")

    if (board.style.transform === "") {
        board.style.transform = "rotate(180deg)"
        Array.from(images).forEach((element) => {
            element.style.transform = "rotate(180deg)"
        })
    } else {

        board.style.transform = ""
        Array.from(images).forEach((element) => {
            element.style.transform = ""
        })
    }
}

export { rotate }