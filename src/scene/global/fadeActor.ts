import * as ex from 'excalibur'
import { Actor, Graphic, Rectangle } from 'excalibur'

class FadeActor extends Actor {
  constructor () {
    super({ z: 100 })
  }

  /**
   * Initial color opacity goes to 0 in duration time
   */
  fadeIn (game : ex.Engine, initialColor = ex.Color.Black, duration = 1000) {
    game.currentScene.add(this)
    this.actions.clearActions()
    this.graphics.show(new Rectangle({ width: window.outerWidth, height: window.outerHeight, color: initialColor }))
    this.graphics.opacity = 1
    this.actions.fade(0, duration).toPromise().then(() => {
      game.currentScene.remove(this)
    })
  }

  onPostUpdate (game:ex.Engine) {
    this.pos = game.currentScene.camera.pos
  }
}

export const fadeActor = new FadeActor()
