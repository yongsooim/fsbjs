import * as ex from 'excalibur'
import { game } from '../../index'

export function enableWheelToZoom () {
  game.input.pointers.on('wheel', wheelToZoomHandler)
}

export function disableWheelToZoom () {
  game.input.pointers.off('wheel', wheelToZoomHandler)
}

const wheelToZoomHandler = (evt: ex.Input.WheelEvent) => {
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
}