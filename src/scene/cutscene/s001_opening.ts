import * as ex from 'excalibur'
import { BoundingBox } from 'excalibur'
import { resource } from '../../resource/resourceManage'
import { fadeActor } from '../global/fadeActor'

export const s001_opening = new ex.Scene()

const actor = new ex.Actor()
const sonataSynth = new ex.Actor()
const son = new ex.Actor()


s001_opening.onInitialize = async (game) => {
  await Promise.all([
    resource.bgm('sonata').load(),
    resource.fx('e112').load(),
    resource.map('0469_tcl0___').load(),
    resource.fm('csona_e0').load(),
    resource.ps('cson000').load()
  ])

  sonataSynth.graphics.use(new ex.Sprite({image :resource.fm('csona_e0'), sourceView : {x:5, y:7, width:101, height: 115}}))
  sonataSynth.pos = ex.vec(550, 1600)
  

  son.graphics.use(new ex.Sprite({image :resource.ps('cson000'), sourceView : {x:0, y:96, width:48, height: 96}}))
  son.pos = ex.vec(388, 1850)
  son.z = 2

  
  s001_opening.add(sonataSynth)
  s001_opening.add(son)

  game.input.pointers.on('wheel', function (evt) {
    if (evt.deltaY > 0) {
        if (game.currentScene.camera.zoom > 0.4) {
            game.currentScene.camera.zoom *= 0.9;
        }
    } else {
        if (game.currentScene.camera.zoom < 4) {
            game.currentScene.camera.zoom *= 1.1;
        }
    }
})


  s001_opening.add(actor)

  resource.map('0469_tcl0___').addTiledMapToScene(s001_opening)

  resource.bgm('sonata').loop = true
  resource.bgm('sonata').play()
  resource.fx('e112').play()
  fadeActor.fadeIn(game, ex.Color.White, 1000)

  setTimeout(() => {
    fadeActor.fadeIn(game, ex.Color.White, 2000)
    resource.fx('e112').volume = 0.35
    resource.fx('e112').play()
  }, 2500)

  game.currentScene.camera.pos = ex.vec(resource.map('0469_tcl0___').data.width * 32, 1280)
  game.currentScene.camera.zoom = 1.8
  game.currentScene.camera.move(ex.vec(resource.map('0469_tcl0___').data.width * 32, resource.map('0469_tcl0___').data.height * 48 - 316 ), 6000)
}

