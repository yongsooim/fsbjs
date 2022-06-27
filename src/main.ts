import Phaser from "phaser"
import cameraUtil from "./camera/camera"
import { config } from "./config"

// create the game, and pass it the configuration
export const game = new Phaser.Game(config)
  

function fitAndFill() {
  const screenRatio = window.innerWidth / window.innerHeight
  const guaranteedWidth = 800
  const guaranteedHeight = 600
  const guaranteedRatio = 800 / 600
  if(screenRatio === guaranteedRatio) {
    game.scale.setGameSize(guaranteedWidth, guaranteedHeight)
  } else if(screenRatio > guaranteedRatio){
    game.scale.setGameSize(guaranteedHeight * screenRatio , guaranteedHeight)
  } else {
    game.scale.setGameSize(guaranteedWidth, guaranteedWidth / screenRatio)
  }

}

fitAndFill()

window.addEventListener("resize", fitAndFill)
window.addEventListener("change", fitAndFill)
window.addEventListener("orientationchange", fitAndFill)
screen.orientation.addEventListener('change', fitAndFill)

document.getElementsByTagName('canvas')[0].addEventListener('pointerdown', ()=> {
  document.getElementById('game').focus()
})