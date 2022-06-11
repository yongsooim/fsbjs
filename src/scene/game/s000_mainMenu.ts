import { Engine, Scene, Actor, vec, Input, Animation, Sprite, Color, AnimationStrategy } from 'excalibur'
import { resource } from '../../resource/resourceManage'
import { fadeActor } from '../global/fadeActor'
import { s001_opening } from '../cutscene/s001_opening'
import { s999_test } from '../global/s999_test'

export const s000_MainMenu = new Scene()

class MainMenu extends Actor {
  Load = 0
  Start = 1
  Exit = 2
  _hovered: number //   load = 0, start = 1, exit = 2
  enterPressed?= false
  stopAnimate: boolean
  static introBackgroundImage = resource.pcx('st00').toSprite()

  set hovered (num) {
    if (num === -1) num = 2
    else if (num === 3) num = 0
    this._hovered = num
  }

  get hovered () {
    return this._hovered
  }

  onInitialize = async (game: Engine) => {

      await Promise.all([
        resource.pcx('st00').load(),
        resource.pcx('st01').load(),
        resource.fx('e156').load(),
        resource.fx('e154').load(),
        resource.bgm('pusan').load(),
      ])
      
    
    
    
    this.graphics.layers.create({ name: 'background', order: 0 })
    this.graphics.layers.create({ name: 'selector', order: 1 })
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
    this.pos = vec(game.drawWidth / 2, game.drawHeight / 2)

    if (!this.stopAnimate) {
      if (game.input.keyboard.wasPressed(Input.Keys.Up)) {
        resource.fx('e156').play()
        this.hovered--
      } else if (game.input.keyboard.wasPressed(Input.Keys.Down)) {
        resource.fx('e156').play()
        this.hovered++
      }

      switch (this.hovered) {
      case (this.Load):
        this.graphics.layers.get('selector').offset = vec(183, 101)
        this.graphics.layers.get('selector').use(this.loadSelectedAnimation)
        break
      case (this.Start):
        this.graphics.layers.get('selector').offset = vec(183, 149)
        this.graphics.layers.get('selector').use(this.startSelectedAnimation)
        break
      case (this.Exit):
        this.graphics.layers.get('selector').offset = vec(186, 193)
        this.graphics.layers.get('selector').use(this.exitSelectedAnimation)
        break
      }
    }

    if (!this.stopAnimate && this.enterPressed) {
      this.stopAnimate = true

      this.graphics.layers.get('selector').hide()

      switch (this.hovered) {
      case (this.Exit):
        this.graphics.layers.get('selector').offset = vec(186, 193)
        this.graphics.layers.get('selector').use(new Sprite({ image: resource.pcx('st01'), sourceView: { x: 0, y: 0, width: 112, height: 51 } }))
        break

      case (this.Start):
        this.graphics.layers.get('selector').offset = vec(183, 148)
        this.graphics.layers.get('selector').use(new Sprite({ image: resource.pcx('st01'), sourceView: { x: 0, y: 51, width: 150, height: 51 } }))
        break

      case (this.Load):
        this.graphics.layers.get('selector').offset = vec(182, 101)
        this.graphics.layers.get('selector').use(new Sprite({ image: resource.pcx('st01'), sourceView: { x: 0, y: 102, width: 128, height: 51 } }))
        break
      }

      resource.fx('e154').play()
      resource.bgm('pusan').stop()

      fadeActor.fadeOut(game, Color.Black, 1000)

//      game.addScene('s001', s001_opening)
      // game.addScene('s999', s999_test)
      // game.goToScene('s999')

      resource.load([
        resource.map('0469_tcl0___'),
        resource.bgm('sonata'),
        resource.fx('e112'),
        resource.fm('csona_e0'),
        resource.ps('cson000'),
        resource.se('sp_wind_first'),
        resource.se('sp_thunder03'),
        resource.ps('cson000'),
        resource.ps('cson000'),
        resource.pcx('whdlgbox')
      ])

      setTimeout(async () => {
        await resource.load([
          resource.map('0469_tcl0___'),
          resource.bgm('sonata'),
          resource.fx('e112'),
          resource.fm('csona_e0'),
          resource.ps('cson000'),
          resource.se('sp_wind_first'),
          resource.se('sp_thunder03'),
          resource.pcx('whdlgbox')
        ])

        game.goToScene('s001')

        game.removeScene(s000_MainMenu)
      }, 1000)
    }
  }

  loadSelectedAnimation = new Animation({
    frames: [
      { graphic: new Sprite({ image: resource.pcx('st01'), sourceView: { x: 130, y: 102, width: 128, height: 51 } }), duration: 80 },
      { graphic: new Sprite({ image: resource.pcx('st01'), sourceView: { x: 260, y: 102, width: 128, height: 51 } }), duration: 80 },
      { graphic: new Sprite({ image: resource.pcx('st01'), sourceView: { x: 390, y: 102, width: 128, height: 51 } }), duration: 80 }
    ],
    strategy: AnimationStrategy.Loop
  })

  startSelectedAnimation = new Animation({
    frames: [
      { graphic: new Sprite({ image: resource.pcx('st01'), sourceView: { x: 150, y: 51, width: 150, height: 51 } }), duration: 80 },
      { graphic: new Sprite({ image: resource.pcx('st01'), sourceView: { x: 298, y: 51, width: 150, height: 51 } }), duration: 80 },
      { graphic: new Sprite({ image: resource.pcx('st01'), sourceView: { x: 446, y: 51, width: 150, height: 51 } }), duration: 80 }
    ],
    strategy: AnimationStrategy.Loop
  })

  exitSelectedAnimation = new Animation({
    frames: [
      { graphic: new Sprite({ image: resource.pcx('st01'), sourceView: { x: 112, y: 0, width: 112, height: 51 } }), duration: 80 },
      { graphic: new Sprite({ image: resource.pcx('st01'), sourceView: { x: 224, y: 0, width: 112, height: 51 } }), duration: 80 },
      { graphic: new Sprite({ image: resource.pcx('st01'), sourceView: { x: 336, y: 0, width: 112, height: 51 } }), duration: 80 }
    ],
    strategy: AnimationStrategy.Loop
  })
}

let mainMenuActor : MainMenu | null = null

s000_MainMenu.onInitialize = (game) => {
  mainMenuActor = new MainMenu()
  s000_MainMenu.add(mainMenuActor)

  s000_MainMenu.camera.strategy.lockToActor(mainMenuActor)
  s000_MainMenu.camera.zoom = 1.5

  fadeActor.fadeIn(game, Color.White, 800)
}
