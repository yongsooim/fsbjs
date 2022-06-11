import { SpriteSheet, Scene, Actor, Engine, LockCameraToActorStrategy, vec } from 'excalibur'
import { player } from '../../fsbEngine/character/player'
import { enableWheelToZoom, disableWheelToZoom } from '../../fsbEngine/camera/cameraUtil'
import { DevTool } from '@excaliburjs/dev-tools'
import { resource } from '../../resource/resourceManage'
import { input } from '../../fsbEngine/input/inputManage'

export const s999_test = new Scene()

s999_test.onInitialize = async (game) => {
  //const devtool = new DevTool(game) // dev tools 사용 안하려면 주석처리

  await resource.load([
    // resource.map('0022_tfi0___'),
     resource.map('0130_tdi0___'),
    //resource.map('0476_tbb0___'),

   // resource.bgm('pao')
  ])

  await resource.load([
    resource.ps('cson000'),
    resource.ps('cdit000'),
    resource.ps('cjah000'),
    resource.ps('csam00'),
    resource.ps('csona00'),
    resource.ps('cmiro00'),
    resource.ps('cjupa00'),
    resource.ps('cpusa00'),
    resource.ps('csao00'),
    resource.ps('cpao00'),
    resource.pcx('shadow')
  ])

  enableWheelToZoom()
  // disableWheelToZoom(game, s999_test)
  // resource.bgm('vill2').loop = true
  // resource.bgm('vill2').play()
  resource.bgm('pao').play()
  resource.bgm('pao').loop = true

  // resource.map('0022_tfi0___').addTiledMapToScene(game.currentScene)
   resource.map('0130_tdi0___').addTiledMapToScene(game.currentScene)
  //resource.map('0476_tbb0___').addTiledMapToScene(game.currentScene)
  //player.currentMap = resource.map('0476_tbb0___')
  player.currentMap = resource.map('0130_tdi0___')

  const spriteSheet = SpriteSheet.fromImageSource({ image: resource.ps('csam00'), grid: { rows: 4, columns: 6, spriteWidth: 32, spriteHeight: 48 } })

  s999_test.add(player)
  s999_test.add(input)
  player.pos = vec(8 * 64, 8 * 48)
  player.z = -1
  // s999_test.camera.strategy.lockToActor(player)
  s999_test.camera.strategy.elasticToActor(player.focusActor, 0.6, 0.7)
  // player.graphics.use(spriteSheet.getSprite(0, 0))
  // player.actions.moveBy(vec(320, 480), 128)  
}
