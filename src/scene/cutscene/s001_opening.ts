import * as ex from 'excalibur'
import { resources } from '../../resource/resourceManage'

export const s001_opening = new ex.Scene()

s001_opening.onInitialize = (game) => {
  resources.sonata.play()
  resources.e112.play()
  resources.m0469_tcl0.addTiledMapToScene(game.currentScene)

  game.currentScene.camera.pos = ex.vec(0, 0)
}

s001_opening.update = (game) => {
  let currentCameraPos = game.currentScene.camera.pos
  currentCameraPos = ex.vec(currentCameraPos.x, currentCameraPos.y + 20) 
}
