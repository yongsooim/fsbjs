import * as ex from 'excalibur'
import { game } from '../../index'

let targetZoom = 1
let targetGame : ex.Engine
let targetScene : ex.Scene


export function enableWheelToZoom (_game : ex.Engine, _scene : ex.Scene) {
  console.log(_game)
  targetGame = _game
  targetScene = _scene
  //_game.input.pointers.on('wheel', wheelToZoomHandler)
  _game.input.pointers.on('wheel', (evt) => {
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
    targetScene.camera.zoomOverTime(targetZoom, 98, ex.EasingFunctions.EaseOutQuad)
    //targetScene.camera.zoom = targetZoom
  
  })

  console.log()
}

export function disableWheelToZoom (_game : ex.Engine) {
  game.input.pointers.off('wheel', wheelToZoomHandler)
}

const wheelToZoomHandler = (evt: ex.Input.WheelEvent) => {
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
  targetScene.camera.zoomOverTime(targetZoom, 500, ex.EasingFunctions.EaseInOutCubic)
}