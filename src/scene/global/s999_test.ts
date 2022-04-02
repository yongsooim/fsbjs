import * as ex from 'excalibur'
import { Actor, Engine, LockCameraToActorStrategy } from 'excalibur'
import { resource } from '../../resource/resourceManage'
import { player } from '../../fsbEngine/character/player'
import { enableWheelToZoom } from '../../fsbEngine/camera/wheelToZoom'

export const s999_test = new ex.Scene()

s999_test.onInitialize = async (game) => {
  await Promise.all([
    resource.map('0022_tfi0___').load(),
    resource.bgm('vill2').load()
  ])

  enableWheelToZoom(game)

  //resource.bgm('vill2').loop = true
  //resource.bgm('vill2').play()

  resource.map('0022_tfi0___').addTiledMapToScene(game.currentScene)
  const spriteSheet = ex.SpriteSheet.fromImageSource({ image: resource.ps('csam00'), grid: { rows: 4, columns: 6, spriteWidth: 32, spriteHeight: 48 } })

  s999_test.add(player)
  player.pos = ex.vec(640, 480)
  //s999_test.camera.strategy.lockToActor(player)
  s999_test.camera.strategy.elasticToActor(player.focusActor, 0.6, 0.7)
  //player.graphics.use(spriteSheet.getSprite(0, 0))
  //player.actions.moveBy(ex.vec(320, 480), 128)
}
