import { Axis, BoundingBox, Engine, Input } from "excalibur"
import { game } from "../../index"
import { player } from "../character/player"

let targetZoom = 1

enum ELetterBoxAxis {
  None,
  X,
  Y,
  Both,
}

export function enableWheelToZoom() {
  game.input.pointers.on("wheel", wheelToZoomHandler)
}

export function disableWheelToZoom() {
  game.input.pointers.off("wheel", wheelToZoomHandler)
}

const zoomPow = 1.15
let currentZoomLevel = 0

const wheelToZoomHandler = (evt: Input.WheelEvent) => {
  if (evt.deltaY > 0) {
    zoomIn()
  } else {
    zoomOut()
  }

  console.log(`zoom level ${currentZoomLevel}, zoom scale ${game.currentScene.camera.zoom}`)
}

export function zoomIn() {
  currentZoomLevel--
  if (currentZoomLevel < -10) {
    currentZoomLevel = -10
  }
  game.currentScene.camera.zoom = zoomPow ** currentZoomLevel
}

export function zoomOut() {
  currentZoomLevel++
  if (currentZoomLevel > 10) {
    currentZoomLevel = 10
  }
  game.currentScene.camera.zoom = zoomPow ** currentZoomLevel

}


export function cameraBound() {

  game.currentScene.camera.onPreUpdate = () => {
    let mapWidth = game.currentScene.tileMaps[0].columns * 64
    let mapHeight = game.currentScene.tileMaps[0].rows * 48

    let screenWidth = game.drawWidth
    let screenHeight = game.drawHeight

    game.currentScene.camera.x = player.focusActor.pos.x
    game.currentScene.camera.y = player.focusActor.pos.y


    let letterboxAxis : ELetterBoxAxis
    
    if (mapWidth < screenWidth && mapHeight < screenHeight) {
      letterboxAxis = ELetterBoxAxis.Both

      game.currentScene.camera.x = mapWidth / 2
      game.currentScene.camera.y = mapHeight / 2

    } else if (mapWidth < screenWidth) {
      letterboxAxis = ELetterBoxAxis.Y

      game.currentScene.camera.x = mapWidth / 2

      if(player.focusActor.pos.y < screenHeight / 2) {
        game.currentScene.camera.y = screenHeight / 2
      } else if (player.focusActor.pos.y > mapHeight - screenHeight / 2) {
        game.currentScene.camera.y = mapHeight - screenHeight / 2
      }

    } else if (mapHeight < screenHeight) {

      
      if(player.focusActor.pos.x < screenWidth / 2) {
        game.currentScene.camera.x = screenWidth / 2
      } else if (player.focusActor.pos.x > mapWidth - screenWidth / 2) {
        game.currentScene.camera.x = mapWidth - screenWidth / 2
      }

      game.currentScene.camera.y = mapHeight / 2


    } else {

      letterboxAxis = ELetterBoxAxis.None
 
      if(player.focusActor.pos.x < screenWidth / 2) {
        game.currentScene.camera.x = screenWidth / 2
      } else if (player.focusActor.pos.x > mapWidth - screenWidth / 2) {
        game.currentScene.camera.x = mapWidth - screenWidth / 2
      }

      if(player.focusActor.pos.y < screenHeight / 2) {
        game.currentScene.camera.y = screenHeight / 2
      } else if (player.focusActor.pos.y > mapHeight - screenHeight / 2) {
        game.currentScene.camera.y = mapHeight - screenHeight / 2
      }
    }
  }
}


window.onresize = () => {
  cameraBound()
  console.log(game.canvasHeight)
}


