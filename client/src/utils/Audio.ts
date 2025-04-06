
import safeMove from "../assets/sounds/move-self.mp3"
import captureMove from "../assets/sounds/capture.mp3"
import checkMove from "../assets/sounds/move-check.mp3"
import endGame from "../assets/sounds/move-check.mp3"
import illegalMove from "../assets/sounds/illegal.mp3"

const playSound = (file: string) => {
    const audio = new Audio(file);
    audio.play()
}

export const chessAudio = {
    safeMove: () => playSound(safeMove),
    checkMove:  () => playSound(checkMove),
    captureMove: () => playSound(captureMove),
    illegalMove: () => playSound(illegalMove),
    endGame: () => playSound(endGame),
}