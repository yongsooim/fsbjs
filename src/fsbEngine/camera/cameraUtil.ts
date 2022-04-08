import * as ex from 'excalibur'

export function enableWheelToZoom (game : ex.Engine) {
  game.input.pointers.on('wheel', function (evt) {
    console.log(evt)
    if (evt.deltaY > 0) {
      if (game.currentScene.camera.zoom > 0.4) {
        game.currentScene.camera.zoom /= 1.1
      }
    } else {
      if (game.currentScene.camera.zoom < 4) {
        game.currentScene.camera.zoom *= 1.1
      }
    }
  })
}

export function disableWheelToZoom (game : ex.Engine) {
  game.input.pointers.off('wheel')
}