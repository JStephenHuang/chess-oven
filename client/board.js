import { onClick } from "./helper/onClick.js";
import { Piece } from "./models/Piece.js";
import { countdown } from "./helper/countdown.js";

const board = document.getElementById("board");

export let isPaused = false;
export let gameState;

// const cols = "abcdefgh"

// 11 (column, row)
// board will be organized as a cartesian map: a1 -> '00', h8 -> '77'

function createBoard() {
  for (let i = 7; i >= 0; i--) {
    // for i rows:
    for (let j = 0; j < 8; j++) {
      // for j cols
      const id = `${j}${i}`;

      const squareDiv = document.createElement("div");
      squareDiv.setAttribute("class", "square");

      // setting square color
      if ((i + j) % 2 === 0) {
        squareDiv.classList.add("white");
      } else {
        squareDiv.classList.add("black");
      }

      squareDiv.setAttribute("id", id);
      squareDiv.addEventListener("click", (event) => onClick(event));

      board.appendChild(squareDiv);
    }
  }
}

createBoard();

function setBoard() {
  const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

  const rows = initialPosition.split("/");
  // rows = ['rnbqkbnr', 'pppppppp','8','8','8',RNBQKBNR...]

  let rowNumber = 7;

  for (const row of rows) {
    // looping row in rows -> 'rnbqkbnr'

    for (let i = 0; i < 8; i++) {
      const initial = row[i];
      if (initial === "8") break;

      const piece = new Piece(initial);

      const img = document.createElement("img");
      img.setAttribute("src", `/client/assets/${piece.img}`);
      img.setAttribute("id", initial);
      img.classList.add("piece");

      const id = `${i}${rowNumber}`;

      const square = document.getElementById(id);

      square.appendChild(img);
    }
    rowNumber -= 1;
  }
}

function setTimer(time) {
  const whiteTimerElement = document.getElementById("white-timer");
  const blackTimerElement = document.getElementById("black-timer");

  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const formattedTime = `${minutes}:${seconds.pad()}`;

  whiteTimerElement.innerHTML = formattedTime;
  blackTimerElement.innerHTML = formattedTime;

  countdown(time, whiteTimerElement, blackTimerElement);
}

export function togglePause() {
  isPaused = !isPaused;
}

export function pause() {
  isPaused = true;
}

function setMenuFeatures() {
  const pauseButton = document.getElementById("pause-btn");
  pauseButton.addEventListener("click", togglePause);

  const surrenderButton = document.getElementById("surrender-btn");
  surrenderButton.addEventListener("click", surrenderPopup);

  const restartButton = document.getElementById("restart-btn");
  restartButton.addEventListener("click", restartPopup);
}

function createPopup(message, confirmAction) {
  const popup = document.createElement('div');
  popup.className = 'menu-popup';
  popup.innerHTML = `
    <div class="popup-content">
      <p>${message}</p>
      <button class="confirm-btn">Confirm</button>
      <button class="cancel-btn">Cancel</button>
    </div>
  `;

  document.getElementById("btn-container").appendChild(popup);

  const confirmBtn = popup.querySelector('.confirm-btn');
  const cancelBtn = popup.querySelector('.cancel-btn');

  confirmBtn.addEventListener('click', () => {
    confirmAction();
    closePopup(popup);
  });

  cancelBtn.addEventListener('click', () => closePopup(popup));

  // Close popup when clicking outside
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
}

function closePopup(popup) {
  document.getElementById("btn-container").removeChild(popup);
}

function surrenderPopup() {
  createPopup('Are you sure you want to surrender?', () => {
    // Add your surrender logic here
    console.log('Player surrendered');
  });
}

function restartPopup() {
  createPopup('Are you sure you want to restart the game?', () => {
    location.reload()
    console.log('Game restarted');
  });
}

setMenuFeatures();
setBoard();
setTimer(62);
