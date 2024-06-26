Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

import { isPaused } from "../board.js";
import { onGameOver } from "./onGameOver.js";

export function countdown(time, whiteTimerElement, blackTimerElement) {
  let whiteTime = time;
  let blackTime = time;
  const timeElpased = setInterval(function () {
    const turn = document.getElementById("turn").innerHTML; // White | Black

    if (isPaused) return;

    if (turn === "White") {
      whiteTime--;

      if (whiteTime < 0) {
        playAudio("checkmate");

        onGameOver("Flag", `Black won. White ran out of time.`);
        clearInterval(timeElpased);
        return;
      } // declare black as the winner
      const minutes = Math.floor(whiteTime / 60);
      const seconds = whiteTime - minutes * 60;

      whiteTimerElement.innerHTML = `${minutes}:${seconds.pad()}`;
    } else {
      blackTime--;

      if (blackTime < 0) {
        playAudio("checkmate");

        onGameOver("Flag", `White won. Black ran out of time.`);
        clearInterval(timeElpased);
        return;
      }

      const minutes = Math.floor(blackTime / 60);
      const seconds = blackTime - minutes * 60;

      blackTimerElement.innerHTML = `${minutes}:${seconds.pad()}`;
    }
  }, 1000);
}

// function decrementTimer(color, time, timerElement) {
//   if (isPaused) return;

//   if (time < 0) return;

//   time--;

//   const minutes = Math.floor(time / 60);
//   const seconds = time - minutes * 60;

//   timerElement.innerHTML = `${minutes}:${seconds.pad()}`;
// }
