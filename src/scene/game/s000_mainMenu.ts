import * as ex from 'excalibur'
import { Engine } from 'excalibur'
import { resource } from '../../resource/resourceManage'
import { fadeActor } from '../global/fadeActor'
import { s001_opening } from '../cutscene/s001_opening'
import { s999_test } from '../global/s999_test'

export const s000_MainMenu = new ex.Scene()

let mainMenuActor : MainMenu | null = null

s000_MainMenu.onInitialize = (game) => {
  mainMenuActor = new MainMenu()
  s000_MainMenu.add(mainMenuActor)

  s000_MainMenu.camera.strategy.lockToActor(mainMenuActor)
  s000_MainMenu.camera.zoom = 1.5

  fadeActor.fadeIn(game)
}

class MainMenu extends ex.Actor {

  constructor(){
    super()
  }
  Load = 0
  Start = 1
  Exit = 2
  _hovered: number //   load = 0, start = 1, exit = 2
  enterPressed?= false
  stopAnimate: boolean
  static introBackgroundImage = resource.pcx('st00').toSprite()

  set hovered(num) {
    if (num === -1) num = 2
    else if (num === 3) num = 0
    this._hovered = num
  }

  get hovered() {
    return this._hovered
  }


  onInitialize = (game) => {
    this.graphics.layers.create({ name: 'background', order: 0 })
    this.graphics.layers.create({ name: 'selector', order: 1 })
    this.graphics.layers.create({ name: 'fadein', order: 2 }) // white box for fade in
    this.graphics.layers.get('background').show(MainMenu.introBackgroundImage)
  
    this.hovered = this.Load
    this.stopAnimate = false
  
    resource.bgm('pusan').play()
    game.input.keyboard.on('press', (evt) => {
      if (evt.value === 'Enter') {
        this.enterPressed = true
      }
    })
  }

  update = (game: Engine, delta: number) => {
    this.pos = ex.vec(game.drawWidth / 2, game.drawHeight / 2)

    if (!this.stopAnimate) {
      if (game.input.keyboard.wasPressed(ex.Input.Keys.Up)) {
        resource.fx('e156').play()
        this.hovered--
      } else if (game.input.keyboard.wasPressed(ex.Input.Keys.Down)) {
        resource.fx('e156').play()
        this.hovered++
      }

      switch (this.hovered) {
        case (this.Load):
          this.graphics.layers.get('selector').offset = ex.vec(183, 101)
          this.graphics.layers.get('selector').use(this.loadSelectedAnimation)
          break
        case (this.Start):
          this.graphics.layers.get('selector').offset = ex.vec(183, 149)
          this.graphics.layers.get('selector').use(this.startSelectedAnimation)
          break
        case (this.Exit):
          this.graphics.layers.get('selector').offset = ex.vec(186, 193)
          this.graphics.layers.get('selector').use(this.exitSelectedAnimation)
          break
      }
    }

    if (!this.stopAnimate && this.enterPressed) {
      this.stopAnimate = true

      this.graphics.layers.get('selector').hide()

      switch (this.hovered) {
        case (this.Exit):
          this.graphics.layers.get('selector').offset = ex.vec(186, 193)
          this.graphics.layers.get('selector').use(new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 0, y: 0, width: 112, height: 51 } }))
          break

        case (this.Start):
          this.graphics.layers.get('selector').offset = ex.vec(183, 148)
          this.graphics.layers.get('selector').use(new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 0, y: 51, width: 150, height: 51 } }))
          break

        case (this.Load):
          this.graphics.layers.get('selector').offset = ex.vec(182, 101)
          this.graphics.layers.get('selector').use(new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 0, y: 102, width: 128, height: 51 } }))
          break
      }
      resource.fx('e154').play()
      resource.bgm('pusan').stop()

      game.addScene('s001', s001_opening)
      game.goToScene('s001')

      //game.addScene('s999', s999_test)
      //game.goToScene('s999')

      game.removeScene(s000_MainMenu)
    }
  }

  loadSelectedAnimation = new ex.Animation({
    frames: [
      { graphic: new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 130, y: 102, width: 128, height: 51 } }), duration: 99 },
      { graphic: new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 260, y: 102, width: 128, height: 51 } }), duration: 99 },
      { graphic: new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 390, y: 102, width: 128, height: 51 } }), duration: 99 }
    ],
    strategy: ex.AnimationStrategy.Loop
  })

  startSelectedAnimation = new ex.Animation({
    frames: [
      { graphic: new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 150, y: 51, width: 150, height: 51 } }), duration: 99 },
      { graphic: new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 298, y: 51, width: 150, height: 51 } }), duration: 99 },
      { graphic: new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 446, y: 51, width: 150, height: 51 } }), duration: 99 }
    ],
    strategy: ex.AnimationStrategy.Loop
  })

  exitSelectedAnimation = new ex.Animation({
    frames: [
      { graphic: new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 112, y: 0, width: 112, height: 51 } }), duration: 99 },
      { graphic: new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 224, y: 0, width: 112, height: 51 } }), duration: 99 },
      { graphic: new ex.Sprite({ image: resource.pcx('st01'), sourceView: { x: 336, y: 0, width: 112, height: 51 } }), duration: 99 }
    ],
    strategy: ex.AnimationStrategy.Loop
  })
}
