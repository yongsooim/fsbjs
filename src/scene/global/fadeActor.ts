import { Engine, Color, Actor, Graphic, Rectangle } from 'excalibur'

class FadeActor extends Actor {
  constructor () {
    super({ z: 100 })
    this.graphics.layers.create({ name: 'fadeIn', order: 0 })
    this.graphics.layers.create({ name: 'fadeOut', order: 1 })
    this.graphics.layers.create({ name: 'letterBoxUp', order: 1 })
    this.graphics.layers.create({ name: 'letterBoxDown', order: 1 })
  }

  /**
   * Initial color opacity goes to 0 in duration time
   */
  fadeIn (game : Engine, initialColor = Color.Black, duration = 1000) {
    game.currentScene.add(this)
    this.actions.clearActions()
    this.graphics.layers.get('fadeIn').use(new Rectangle({ width: window.outerWidth, height: window.outerHeight, color: initialColor }))
    this.graphics.opacity = 1
    this.actions.fade(0, duration).toPromise().then(() => {
      this.graphics.layers.get('fadeIn').hide()
      game.currentScene.remove(this)
      this.actions.clearActions()
    })
  }

  fadeOut (game : Engine, initialColor = Color.Black, duration = 1000) {
    game.currentScene.add(this)
    this.actions.clearActions()
    this.graphics.layers.get('fadeOut').use(new Rectangle({ width: window.outerWidth, height: window.outerHeight, color: initialColor }))
    this.graphics.opacity = 0
    this.actions.fade(1, duration)
  }

  showLetterBox (game : Engine) {

  }

  hideLetterBox (game : Engine) {

  }

  reset () {
    this.actions.clearActions()
    this.graphics.layers.get('fadeIn').hide()
    this.graphics.layers.get('fadeOut').hide()
    this.graphics.opacity = 0
  }

  onPostUpdate (game:Engine) {
    this.pos = game.currentScene.camera.pos
  }
}

export const fadeActor = new FadeActor()
