import * as ex from 'excalibur'
import { Engine } from 'excalibur'
import { resources } from '../../resource/resourceManage'
import { s001_opening } from '../cutscene/s001_opening'

export const s000_MainMenu = new ex.Scene()


s000_MainMenu.onInitialize = async (game) => {

  await Promise.all([
  resources.st00.load(),
  resources.st01.load(),
  resources.e156.load(),
  resources.e154.load(),
  resources.pusan.load()])


  s000_MainMenu.add(introActor)
  console.log('done')
}



class IntroActor extends ex.Actor {
  _hovered: number //   load = 0, start = 1, exit = 2

  enterPressed?= false

  set hovered(num) {
    if (num === -1) {
      num = 2
    } else if (num === 3) {
      num = 0
    }
    this._hovered = num
  }

  get hovered() {
    return this._hovered
  }

  stopAnimate: boolean
  static introBackgroundImage = resources.st00.toSprite()
  fadeinRect: ex.Rectangle


  onInitialize = (game) => {
    introActor.graphics.layers.create({ name: 'background', order: 0 })
    introActor.graphics.layers.create({ name: 'selector', order: 1 })
    introActor.graphics.layers.create({ name: 'fadein', order: 2 }) // white box for fade in
  
    introActor.fadeinRect = new ex.Rectangle({ width: window.outerWidth, height: window.outerHeight, color: ex.Color.White })
  
    introActor.graphics.layers.get('background').show(IntroActor.introBackgroundImage)
    //introActor.graphics.layers.get('fadein').show(introActor.fadeinRect)
  
    introActor.hovered = introActor.Load
    introActor.stopAnimate = false
  
    resources.pusan.play()
    game.input.keyboard.on('press', (evt) => {
      if (evt.value === 'Enter') {
        introActor.enterPressed = true
      }
    })
  }

  update = (game: Engine, delta: number) => {
    introActor.pos = ex.vec(game.drawWidth / 2, game.drawHeight / 2)

     if (introActor.fadeinRect.opacity !== 0) {
      introActor.fadeinRect.opacity *= 0.9
      if (introActor.fadeinRect.opacity < 0.1) {
        introActor.fadeinRect.opacity = 0
      }
    } 

    if (!introActor.stopAnimate) {
      if (game.input.keyboard.wasPressed(ex.Input.Keys.Up)) {
        resources.e156.play()
        introActor.hovered--
      } else if (game.input.keyboard.wasPressed(ex.Input.Keys.Down)) {
        resources.e156.play()
        introActor.hovered++
      }

      switch (introActor.hovered) {
        case (this.Load):
          introActor.graphics.layers.get('selector').offset = ex.vec(183, 101)
          introActor.graphics.layers.get('selector').use(this.loadSelectedAnimation)
          break
        case (this.Start):
          introActor.graphics.layers.get('selector').offset = ex.vec(183, 149)
          introActor.graphics.layers.get('selector').use(this.startSelectedAnimation)
          break
        case (this.Exit):
          introActor.graphics.layers.get('selector').offset = ex.vec(186, 193)
          introActor.graphics.layers.get('selector').use(this.exitSelectedAnimation)
          break
      }
    }

    if (!introActor.stopAnimate && this.enterPressed) {
      introActor.stopAnimate = true

      introActor.graphics.layers.get('selector').hide()

      switch (introActor.hovered) {
        case (this.Exit):
          introActor.graphics.layers.get('selector').offset = ex.vec(186, 193)
          introActor.graphics.layers.get('selector').use(new ex.Sprite({ image: resources.st01, sourceView: { x: 0, y: 0, width: 112, height: 51 } }))
          break

        case (this.Start):
          introActor.graphics.layers.get('selector').offset = ex.vec(183, 148)
          introActor.graphics.layers.get('selector').use(new ex.Sprite({ image: resources.st01, sourceView: { x: 0, y: 51, width: 150, height: 51 } }))
          break

        case (this.Load):
          introActor.graphics.layers.get('selector').offset = ex.vec(182, 101)
          introActor.graphics.layers.get('selector').use(new ex.Sprite({ image: resources.st01, sourceView: { x: 0, y: 102, width: 128, height: 51 } }))
          break
      }
      resources.e154.play()
      resources.pusan.stop()

      game.addScene('s001', s001_opening)
      game.removeScene(s000_MainMenu)
      game.goToScene('s001')
    }
  }

  loadSelectedAnimation = new ex.Animation({
    frames: [
      { graphic: new ex.Sprite({ image: resources.st01, sourceView: { x: 130, y: 102, width: 128, height: 51 } }), duration: 100 },
      { graphic: new ex.Sprite({ image: resources.st01, sourceView: { x: 260, y: 102, width: 128, height: 51 } }), duration: 100 },
      { graphic: new ex.Sprite({ image: resources.st01, sourceView: { x: 390, y: 102, width: 128, height: 51 } }), duration: 100 }
    ],
    strategy: ex.AnimationStrategy.Loop
  })

  startSelectedAnimation = new ex.Animation({
    frames: [
      { graphic: new ex.Sprite({ image: resources.st01, sourceView: { x: 150, y: 51, width: 150, height: 51 } }), duration: 100 },
      { graphic: new ex.Sprite({ image: resources.st01, sourceView: { x: 298, y: 51, width: 150, height: 51 } }), duration: 100 },
      { graphic: new ex.Sprite({ image: resources.st01, sourceView: { x: 446, y: 51, width: 150, height: 51 } }), duration: 100 }
    ],
    strategy: ex.AnimationStrategy.Loop
  })

  exitSelectedAnimation = new ex.Animation({
    frames: [
      { graphic: new ex.Sprite({ image: resources.st01, sourceView: { x: 112, y: 0, width: 112, height: 51 } }), duration: 100 },
      { graphic: new ex.Sprite({ image: resources.st01, sourceView: { x: 224, y: 0, width: 112, height: 51 } }), duration: 100 },
      { graphic: new ex.Sprite({ image: resources.st01, sourceView: { x: 336, y: 0, width: 112, height: 51 } }), duration: 100 }
    ],
    strategy: ex.AnimationStrategy.Loop
  })

  Load = 0
  Start = 1
  Exit = 2

}
const introActor = new IntroActor({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
