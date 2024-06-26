export function playAudio(moveType) {
  const moveSound = new Audio("./assets/audio/move-self.mp3");
  const captureSound = new Audio("./assets/audio/capture.mp3");
  const checkSound = new Audio("./assets/audio/move-check.mp3");
  const gameEndSound = new Audio("./assets/audio/game-end.mp3");
  const castleSound = new Audio("./assets/audio/castle.mp3");

  switch (moveType) {
    case "move":
      moveSound.play();
      break;
    case "check":
      checkSound.play();
      break;
    case "castle":
      castleSound.play();
      break;
    case "checkmate" || "stalemate":
      gameEndSound.play();
      break;
    default:
      captureSound.play();
      break;
  }
}
