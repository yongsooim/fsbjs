import * as ex from 'excalibur'
import { Actor, Engine } from 'excalibur'
import { resources } from '../../resource/resourceManage'
import { fadeActor } from '../global/fadeActor'

export let s999_test = new ex.Scene()

s999_test.onInitialize = async (game) => {

  await Promise.all([
    resources.csam00.load(),
    resources.m0022_tfi0.load(),
    resources.vill2.load()
  ])

  resources.vill2.loop = true
  resources.vill2.play()

  let spriteSheet = ex.SpriteSheet.fromImageSource({ image: resources.csam00, grid: { rows: 6, columns: 4, spriteWidth: 32, spriteHeight: 32 } })
  let csamActor = new Actor()
  csamActor.graphics.use(spriteSheet.getSprite(0, 0))

  s999_test.add(csamActor)
  resources.m0022_tfi0.addTiledMapToScene(game.currentScene)
}
