import { pause } from "../board.js";
import { playAudio } from "./playAudio.js";

export function onGameOver(gameState, subtitle) {
  pause();
  const gameOverPopup = document.getElementById("gameoverPopup");
  const gameStateParagraphElement = document.getElementById("gameState");
  const gameStateSubtitleParagraphElement =
    document.getElementById("gameStateSubtitle");
  const gameOverContent = document.getElementById("gameoverPopupContent");

  const closeBtn = document.getElementById("close-btn");
  const restartBtn = document.getElementById("gameover-restart-btn");

  closeBtn.addEventListener("click", () => {
    gameOverPopup.style.display = "none";
  });

  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });

  gameOverPopup.addEventListener("click", () => {
    gameOverPopup.style.display = "none";
  });

  gameOverContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  gameOverPopup.style.display = "grid";
  gameStateParagraphElement.innerText = gameState;
  gameStateSubtitleParagraphElement.innerText = subtitle;
}
