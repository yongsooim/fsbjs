import * as ex from 'excalibur'
import { resources } from '../../resource/resourceManage'

export const s001_opening = new ex.Scene()

s001_opening.onInitialize = (game) => {
  resources.SonataOgg.play()
  resources.e112.play()
  resources.OpeningMap.addTiledMapToScene(game.currentScene)

  game.currentScene.camera.pos = ex.vec(60, 600)
}

s001_opening.update = (game) => {
  game.currentScene.camera.pos.y += 30
}
