import { Input } from 'excalibur'
import { game } from '../../index'

let targetZoom = 1

export function enableWheelToZoom () {
  game.input.pointers.on('wheel', wheelToZoomHandler)
}

export function disableWheelToZoom () {
  game.input.pointers.off('wheel', wheelToZoomHandler)
}

const wheelToZoomHandler = (evt: Input.WheelEvent) => {
  if (evt.deltaY > 0) {
    if (targetZoom > 0.4) {
      targetZoom /= 1.1
    }
  } else {
    if (targetZoom < 4) {
      targetZoom *= 1.1
    }
  }
  game.currentScene.camera.zoom = targetZoom
}
