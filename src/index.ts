import Phaser from 'phaser'
import cameraUtil from './camera/camera'
import { config } from './config'
import { screenConst } from './const'
import { keyboard } from './input/keyboard'

// create the game, and pass it the configuration
export const game = new Phaser.Game(config)

function fitAndFill () {
  const screenRatio = window.innerWidth / window.innerHeight
  const guaranteedWidth = screenConst.width
  const guaranteedHeight = screenConst.height
  const guaranteedRatio = guaranteedWidth / guaranteedHeight
  if (screenRatio === guaranteedRatio) {
    game.scale.setGameSize(guaranteedWidth, guaranteedHeight)
  } else if (screenRatio > guaranteedRatio) {
    game.scale.setGameSize(guaranteedHeight * screenRatio, guaranteedHeight)
  } else {
    game.scale.setGameSize(guaranteedWidth, guaranteedWidth / screenRatio)
  }
}

fitAndFill()

keyboard.init()

window.addEventListener('resize', fitAndFill)
window.addEventListener('change', fitAndFill)
window.addEventListener('orientationchange', fitAndFill)
screen.orientation.addEventListener('change', fitAndFill)

document.getElementsByTagName('canvas')[0].addEventListener('pointerdown', () => {
  document.getElementById('game').focus()
})
