import * as ex from 'excalibur'
import { Actor, Graphic, Rectangle } from 'excalibur'

class FadeActor extends Actor {
  constructor(){
    super({z:100})
  }

  fadeInWhite(currentScene : ex.Scene){
    this.graphics.use(new Rectangle({ width: window.outerWidth, height: window.outerHeight, color: ex.Color.White }))
    this.graphics.opacity = 1
    currentScene.add(this)
    this.actions.fade(0, 1000).toPromise().then(()=>{currentScene.remove(this)})
  }
}

export const fadeActor = new FadeActor()
