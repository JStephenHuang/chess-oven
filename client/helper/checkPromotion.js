const pieceOptions = ["Q", "N", "R", "B"]

export async function checkPromotion(pieceInitial, focusedSquare, targetSquare) {
  if ((pieceInitial === 'p' && targetSquare.id[1] === '0') || (pieceInitial === 'P' && targetSquare.id[1] === '7')) {
    const color = pieceInitial === "P" ? "w" : "b"

    const squareDiv = document.getElementById(focusedSquare.id);
    const imgElement = squareDiv.querySelector('img');

    const promotionOptions = document.getElementById('piece-options');
    
    promotionOptions.innerHTML = ""

    for (const piece of pieceOptions) {
      const initial = color === "w" ? piece : piece.toLowerCase() 
      const imgPiece = document.createElement("img")
      imgPiece.id = initial
      imgPiece.classList.add("promotion-option")
      imgPiece.src = `/client/assets/${color}${piece}.png`

      promotionOptions.appendChild(imgPiece)
    }

    // launch pop-up, get piece
    const selectedPiece = await showPromotionPopup();

    imgElement.id = selectedPiece;
    imgElement.src = `/client/assets/${color}${selectedPiece}.png`;
  }
}

function showPromotionPopup() {
  return new Promise((resolve) => {
    const promotionPopup = document.getElementById('promotionPopup');
    const promotionOptions = promotionPopup.querySelectorAll('.promotion-option');

    promotionPopup.style.display = 'block';  // displays popup

    promotionOptions.forEach(option => {
      option.addEventListener('click', () => {    // adding event listener to each promotion option
        const selectedPiece = option.id;
        promotionPopup.style.display = 'none';    // closes popup
        resolve(selectedPiece);               // returns promise
      });
    });
  });
}
