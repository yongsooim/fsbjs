import * as ex from 'excalibur'
import { BoundingBox } from 'excalibur'
import { resource, resourceClass } from '../../resource/resourceManage'
import { fadeActor } from '../global/fadeActor'

export const s001_opening = new ex.Scene()

s001_opening.onInitialize = async (game) => {
  await Promise.all([
    resource.bgm.sonata.load(),  
    resource.fx.e112.load(),
    resource.map.m0469_tcl0.load(),
    resourceClass.map('0469_tcl0___').load()
  ])

  console.log('executed') 
  //resource.map.m0469_tcl0.addTiledMapToScene(s001_opening)
  resourceClass.map('0469_tcl0___').addTiledMapToScene(s001_opening)

  resource.bgm.sonata.loop = true
  resource.bgm.sonata.play()
  resource.fx.e112.play()
  setTimeout(()=>{
    resource.fx.e112.volume = 0.4
    resource.fx.e112.play()
  }, 2500)

  let boundingBox = new BoundingBox({left:0, top:0, right:resource.map.m0469_tcl0.data.width * 32, bottom: resource.map.m0469_tcl0.data.height*48})
  
  game.currentScene.camera.pos = ex.vec(resourceClass.map('0469_tcl0___').data.width * 32, 1400)
  game.currentScene.camera.zoom = 1.8
  game.currentScene.camera.move(ex.vec(resourceClass.map('0469_tcl0___').data.width * 32, resourceClass.map('0469_tcl0___').data.height * 48 - window.outerHeight / 2 + 180 )  ,4000)
  s001_opening.onPostUpdate = () => {
  }
}
