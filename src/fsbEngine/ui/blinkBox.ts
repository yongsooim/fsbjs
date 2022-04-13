import { Actor, Engine, Color } from 'excalibur'

class BlinkBox extends Actor {
  public isShown : boolean
  constructor () {
    super()
    this.isShown = true
  }

  udpate (game: Engine, delta: number) {
    super.update(game, delta)
  }
}
