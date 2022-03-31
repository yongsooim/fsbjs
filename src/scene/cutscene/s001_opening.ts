import * as ex from 'excalibur'
import { BoundingBox } from 'excalibur'
import { resource } from '../../resource/resourceManage'
import { fadeActor } from '../global/fadeActor'

export const s001_opening = new ex.Scene()

s001_opening.onInitialize = async (game) => {
  await Promise.all([
    resource.bgm('sonata').load(),
    resource.fx('e112').load(),
    resource.map('0469_tcl0___').load()
  ])

  console.log('executed')
  resource.map('0469_tcl0___').addTiledMapToScene(s001_opening)

  resource.bgm('sonata').loop = true
  resource.bgm('sonata').play()
  resource.fx('e112').play()
  fadeActor.fadeIn(game, ex.Color.White, 1000)

  setTimeout(() => {
    fadeActor.fadeIn(game, ex.Color.White, 1800)
    resource.fx('e112').volume = 0.5
    resource.fx('e112').play()
  }, 2500)

  game.currentScene.camera.pos = ex.vec(resource.map('0469_tcl0___').data.width * 32, 1280)
  game.currentScene.camera.zoom = 1.8
  game.currentScene.camera.move(ex.vec(resource.map('0469_tcl0___').data.width * 32, resource.map('0469_tcl0___').data.height * 48 - 100 ), 6000)
  s001_opening.onPostUpdate = () => {
    game.input.pointers.on('wheel', function (evt) {
      console.log(evt)
      if(evt.deltaY > 0){
        game.currentScene.camera.zoomOverTime(1.5, 500)
      }
      if(evt.deltaY < 0){
        game.currentScene.camera.zoomOverTime(0.5, 500)
      }
    })

  }
}
