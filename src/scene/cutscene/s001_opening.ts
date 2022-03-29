import * as ex from 'excalibur'
import { BoundingBox } from 'excalibur'
import { resources } from '../../resource/resourceManage'

export const s001_opening = new ex.Scene()

s001_opening.onInitialize = async (game) => {
  await Promise.all([
    resources.sonata.load(),  
    resources.e112.load(),
    resources.m0469_tcl0.load()
  ])
 
  console.log('executed')
  resources.m0469_tcl0.addTiledMapToScene(s001_opening)

  resources.sonata.loop = true
  resources.sonata.play()
  resources.e112.play()
  setTimeout(()=>{
    resources.e112.volume = 0.4
    resources.e112.play()
  }, 2500)



  let boundingBox = new BoundingBox({left:0, top:0, right:resources.m0469_tcl0.data.width * 32, bottom: resources.m0469_tcl0.data.height*48})
  
  game.currentScene.camera.pos = ex.vec(resources.m0469_tcl0.data.width * 32, 1400)
  game.currentScene.camera.zoom = 1.8
  //game.currentScene.camera.strategy.limitCameraBounds(boundingBox)

  game.currentScene.camera.move(ex.vec(resources.m0469_tcl0.data.width * 32, resources.m0469_tcl0.data.height * 48 - window.outerHeight / 2 + 180 )  ,4000)


  //game.currentScene.camera.strategy.limitCameraBounds(boundingBox)

  s001_opening.onPostUpdate = () => {
  }

}
