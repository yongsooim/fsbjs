import * as ex from 'excalibur'
import { Actor, Engine } from 'excalibur'
import { resource } from '../../resource/resourceManage'
import { fadeActor } from './fadeActor'

export let s999_test = new ex.Scene()

s999_test.onInitialize = async (game) => {

  await Promise.all([
    resource.asePs('csam00').load(),
    resource.map('0022_tfi0___').load(),
    resource.bgm('vill2').load()
  ])

  resource.bgm('vill2').loop = true
  resource.bgm('vill2').play()

  let spriteSheet = ex.SpriteSheet.fromImageSource({ image: resource.asePs('csam00'), grid: { rows: 6, columns: 4, spriteWidth: 32, spriteHeight: 32 } })
  let csamActor = new Actor()
  csamActor.graphics.use(spriteSheet.getSprite(0, 0))

  s999_test.add(csamActor)
  resource.map('0022_tfi0___').addTiledMapToScene(game.currentScene)
}
