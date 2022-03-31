import * as ex from 'excalibur'
import { Actor, Engine, LockCameraToActorStrategy } from 'excalibur'
import { resource } from '../../resource/resourceManage'
import { fadeActor } from './fadeActor'

export const s999_test = new ex.Scene()

s999_test.onInitialize = async (game) => {
  await Promise.all([
    resource.asePs('csam00').load(),
    resource.map('0022_tfi0___').load(),
    resource.bgm('vill2').load()
  ])

  resource.bgm('vill2').loop = true
  resource.bgm('vill2').play()

  const spriteSheet = ex.SpriteSheet.fromImageSource({ image: resource.asePs('csam00'), grid: { rows: 4, columns: 6, spriteWidth: 32, spriteHeight: 48 } })
  const csamActor = new Actor()
  csamActor.graphics.use(spriteSheet.getSprite(0, 0))
  csamActor.actions.moveBy(ex.vec(320, 480), 128)

  s999_test.add(csamActor)
  resource.map('0022_tfi0___').addTiledMapToScene(game.currentScene)
  s999_test.camera.strategy.lockToActor(csamActor)
}
