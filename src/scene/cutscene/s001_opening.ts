import { Scene, Actor, Font, FontUnit, Color, Animation, vec, Sprite, Text, BoundingBox, EasingFunctions, Rectangle } from 'excalibur'
import { resource } from '../../resource/resource'
import { fadeActor } from '../global/fadeActor'
import { fromFlexImageSource } from '../../resource/util/fsbAnimationUtil'
import { enableWheelToZoom } from '../../fsbEngine/camera/cameraUtil'
//import { DevTool } from '@excaliburjs/dev-tools'

export const s001_opening = new Scene()

const actor = new Actor()
const sonataSynth = new Actor({ x: 550, y: 1600 })
const son = new Actor()

s001_opening.onInitialize = async (game) => {
  //const devtool = new DevTool(game) // dev tools 사용 안하려면 주석처리

  await resource.load([
    resource.bgm('sonata'),
    resource.fx('e112'),
    resource.map('0469_tcl0___'),
    resource.fm('csona_e0'),
    resource.ps('cson000'),
    resource.se('sp_wind_first'),
    resource.se('sp_thunder03'),
    resource.pcx('whdlgbox')
  ])

  enableWheelToZoom()

  resource.map('0469_tcl0___').addTiledMapToScene(s001_opening)

  const sonataSynthSpriteSheet = fromFlexImageSource(resource.fm('csona_e0'), [
    { x: 5, y: 7, width: 101, height: 115 },
    { x: 117, y: 7, width: 101, height: 115 },
    { x: 229, y: 7, width: 101, height: 115 },
    { x: 341, y: 7, width: 101, height: 115 },
    { x: 5, y: 135, width: 101, height: 115 },
    { x: 117, y: 135, width: 101, height: 115 },
    { x: 229, y: 135, width: 101, height: 115 }
  ])

  const sonataSynthAnimation = Animation.fromSpriteSheet(sonataSynthSpriteSheet, [0, 1, 2, 3], 100)

  s001_opening.add(sonataSynth)
  s001_opening.add(son)

  // <WIDTHXL>@@겁 없는 원숭이놈!<D4>
  // 지옥의 고통을
  // 네 놈에게 안겨 주겠다.;<$010>/<D4>@@후후후.;@@그건 두고 봐야
  // 알겠지.;<-><$020>/<POSSUB_D>@@하하하!;@@아하하<$SON5>하하하하하!<D8><$080>/<CS41><F0B><possub_U>/<WIDTHL>@@흥.<D2> 까불지 마라!<D4>
  // 지옥의 고통이라고?;@@<INDENT0>@@이 *미스터* 손은
  // 고통을 모르는 원숭, 아니<D2>
  // 사람이라는 것을 모르는 모양이군.;@~~어느 놈도 날 당하지 못했는데,<D3>
  // ~~그런 요상한 옷차림을 하고서 날 이기겠다고?<D6> 헷!;<-><$SON5:3001><$SONA>/@@흠…….<D4> 음악이
  // 좋긴 한데,;<-><$030>/@@내 취향은 아니군.;<-><DIR2><WA><$SON5:3035>@@꺄하하하하하하핫!!;<-><$SON5:3000><WA><$040>/<$SON5:3001>@@뭐, 뭐야!;<-><$050>/<POS1>@@크윽!!;<$060>@@으아!!<D8><$065>@@으아아아아악!!!<$070>/@@으으윽!!
  // 그만! 그만!/<CS20><F3T><possub_D><W=20><TRANS><WIDTHMAX><POS8H>@@천궁을 소란케 한 죄가 크니
  // 특별히 쓸 곳이 있을 때까지
  // 억만근 쇳덩이 밑에 깔리는 형벌을 준다!<D8><$100>/<B><TRANS><W=50>@@200년 후……<D8>

  resource.pcx('whdlgbox')

  const bubble = new Actor()
  bubble.graphics.layers.create({ name: 'dialogBox', order: 0 })
  bubble.graphics.layers.create({ name: 'text1', order: 1 })
  bubble.graphics.layers.create({ name: 'text2', order: 1 })
  bubble.graphics.layers.create({ name: 'text3', order: 1 })

  const txt2 = new Text({
    text: '겁 없는 원숭이놈!\n지옥의 고통을\n네 놈에게 안겨 주겠다.',
    font: new Font({
      family: 'MalgunGothicChe',
      size: 12,
      unit: FontUnit.Px,
      color: Color.White,
      shadow: {
        offset: vec(1, 1),
        color: Color.Black
      }
    })
  })

  //  bubble.graphics.layers.get('dialogBox').use(txt)

  bubble.graphics.layers.get('text2').show(txt2)
  // bubble.graphics.show(new Rectangle({width:200, height:100, color:Color.DarkGray}))
  bubble.pos = vec(400, 1600)

  s001_opening.add(bubble)

  sonataSynth.graphics.use(sonataSynthAnimation)
  sonataSynth.actions.repeatForever(repeatCtx => {
    repeatCtx.easeTo(sonataSynth.pos.x, 1600 + 12, 2000, EasingFunctions.EaseInOutQuad)
    repeatCtx.delay(150)
    repeatCtx.easeTo(sonataSynth.pos.x, 1600 - 12, 2000, EasingFunctions.EaseInOutQuad)
    repeatCtx.delay(150)
  })

  son.graphics.use(new Sprite({ image: resource.ps('cson000'), sourceView: { x: 10, y: 96, width: 48, height: 96 } }))
  son.pos = vec(388, 1850)
  son.z = 2

  s001_opening.add(actor)

  resource.bgm('sonata').loop = true
  resource.se('sp_wind_first').loop = true
  resource.bgm('sonata').play()
  resource.fx('e112').play()
  resource.se('sp_wind_first').play()
  fadeActor.reset()
  fadeActor.fadeIn(game, Color.White, 1000)

  setTimeout(() => {
    fadeActor.fadeIn(game, Color.White, 2000)
    resource.se('sp_thunder03').play()
  }, 2500)

  game.currentScene.camera.pos = vec(resource.map('0469_tcl0___').data.width * 32, 1280)
  game.currentScene.camera.zoom = 2

  setTimeout(() => {
    game.currentScene.camera.move(vec(resource.map('0469_tcl0___').data.width * 32, resource.map('0469_tcl0___').data.height * 48 - 316), 6000)
  }, 1000)
}
