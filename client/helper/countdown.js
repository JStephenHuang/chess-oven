Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

import { isPaused, gameState } from "../board.js";

export function countdown() {
  let whiteTime = 10;
  let blackTime = 10;
  const timeElpased = setInterval(function () {
    const turn = document.getElementById("turn").innerHTML; // White | Black
    if (isPaused) return;

    if (turn === "White") {
      const whiteTimerElement = document.getElementById("white-timer");

      whiteTime--;

      if (whiteTime === 0) {
        gameState = "black won";
        clearInterval(timeElpased);
      } // declare black as the winner
      const minutes = Math.floor(whiteTime / 60);
      const seconds = whiteTime - minutes * 60;

      console.log(whiteTime);

      whiteTimerElement.innerHTML = `${minutes}:${seconds.pad()}`;
    } else {
      const blackTimerElement = document.getElementById("black-timer");

      blackTime--;

      if (blackTime === 0) {
        gameState = "white won";
        clearInterval(timeElpased);
      }

      const minutes = Math.floor(whiteTime / 60);
      const seconds = blackTime - minutes * 60;

      blackTimerElement.innerHTML = `${minutes}:${seconds.pad()}`;
    }
  }, 1000);
}

// function decrementTimer(color, time, idElement) {
//   if (isPaused) return;

//   const timerElement = document.getElementById(idElement);

//   if (time === 0) return;

//   time--;

//   const minutes = Math.floor(time / 60);
//   const seconds = time - minutes * 60;

//   timerElement.innerHTML = `${minutes}:${seconds.pad()}`;
// }
