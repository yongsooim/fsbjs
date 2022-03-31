import * as ex from 'excalibur'
import { Actor, Graphic, Rectangle } from 'excalibur'

class FadeActor extends Actor {
  constructor(){
    super({z:100})
  }

  /**
   * Initial color opacity goes to 0 in duration time
   */
  fadeIn(game : ex.Engine, initialColor = ex.Color.Black, duration = 1000){
    this.graphics.use(new Rectangle({ width: window.outerWidth, height: window.outerHeight, color: initialColor }))
    this.graphics.opacity = 1
    game.currentScene.add(this)
    this.actions.fade(0, duration).toPromise().then(()=>{game.currentScene.remove(this)}) 
  }

  onPostUpdate(game:ex.Engine){
    this.pos = game.currentScene.camera.pos
  }
}

export const fadeActor = new FadeActor()
