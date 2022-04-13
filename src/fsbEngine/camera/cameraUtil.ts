import { Engine, Scene, EasingFunctions, Input } from 'excalibur'
import { game } from '../../index'

let targetZoom = 1
let targetGame : Engine
let targetScene : Scene
let isZooming = false

export function enableWheelToZoom (_game : Engine, _scene : Scene) {
  console.log(_game)
  targetGame = _game
  targetScene = _scene
  // _game.input.pointers.on('wheel', wheelToZoomHandler)
  _game.input.pointers.on('wheel', (evt) => {
    if (evt.deltaY > 0) {
      if (targetZoom > 0.4) {
        targetZoom /= 1.1
      }
    } else {
      if (targetZoom < 4) {
        targetZoom *= 1.1
      }
    }

    if (isZooming === false) {
      targetScene.camera.zoomOverTime(targetZoom, 300, EasingFunctions.EaseOutQuad).then(() => {
        isZooming = false
      })
      isZooming = true
    }
    // targetScene.camera.zoom = targetZoom
  })
}

export function disableWheelToZoom (_game : Engine) {
  game.input.pointers.off('wheel', wheelToZoomHandler)
}

const wheelToZoomHandler = (evt: Input.WheelEvent) => {
  console.log(evt)
  if (evt.deltaY > 0) {
    if (targetZoom > 0.4) {
      targetZoom /= 1.1
    }
  } else {
    if (targetZoom < 4) {
      targetZoom *= 1.1
    }
  }
  targetScene.camera.zoomOverTime(targetZoom, 500, EasingFunctions.EaseInOutCubic)
}
