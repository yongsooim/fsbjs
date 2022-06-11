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

export function cameraBound() {
  let mapWidth = game.currentScene.tileMaps[0].columns * 64
  let mapHeight = game.currentScene.tileMaps[0].rows * 48

  let screenWidth = game.canvasWidth
  let screenHeight = game.canvasHeight

  let letterboxAxis = ELetterBoxAxis.None

  if (mapWidth < screenWidth && mapHeight < screenHeight) {
    letterboxAxis = ELetterBoxAxis.Both

    game.currentScene.camera.x = mapWidth / 2
    game.currentScene.camera.y = mapHeight / 2

  } else if (mapWidth < screenWidth) {
    letterboxAxis = ELetterBoxAxis.Y

    let boundingBox = new BoundingBox(
      0,
      0,
      screenWidth,
      game.currentScene.tileMaps[0].rows * 48
    )

    game.currentScene.camera.x = mapWidth / 2
    game.currentScene.camera.strategy.lockToActorAxis(player.focusActor, Axis.X)
    game.currentScene.camera.strategy.limitCameraBounds(boundingBox)
  } else if (mapHeight < screenHeight) {

    letterboxAxis = ELetterBoxAxis.X

    let boundingBox = new BoundingBox(
      0,
      0,
      game.currentScene.tileMaps[0].columns * 64,
      screenHeight
    )
    
    game.currentScene.camera.y = mapHeight / 2

    game.currentScene.camera.strategy.lockToActorAxis(player.focusActor, Axis.Y)
    game.currentScene.camera.strategy.limitCameraBounds(boundingBox)
    game.currentScene.camera.onPreUpdate = () => { 
      game.currentScene.camera.x = screenWidth / 2
    }

  } else {
    letterboxAxis = ELetterBoxAxis.None

    let boundingBox = new BoundingBox(
      0,
      0,
      game.currentScene.tileMaps[0].columns * 64,
      game.currentScene.tileMaps[0].rows * 48
    )

    game.currentScene.camera.strategy.lockToActor(player.focusActor)
    game.currentScene.camera.strategy.limitCameraBounds(boundingBox)

    console.log("?")
  }
}

export function enableWheelToZoom() {
  game.input.pointers.on("wheel", wheelToZoomHandler)
}

export function disableWheelToZoom() {
  game.input.pointers.off("wheel", wheelToZoomHandler)
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


export function cameraBound2() {

  game.currentScene.camera.onPreUpdate = () => {

    
    let mapWidth = game.currentScene.tileMaps[0].columns * 64
    let mapHeight = game.currentScene.tileMaps[0].rows * 48

    let screenWidth = game.canvasWidth / game.currentScene.camera.zoom
    let screenHeight = game.canvasHeight / game.currentScene.camera.zoom

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
  //cameraBound()
  cameraBound2()

}


