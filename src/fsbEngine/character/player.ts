import * as ex from 'excalibur'
import { FsbCoordinate, Direction } from '../type/fsbTypes'
import { resource } from '../../resource/resourceManage'

const runSheet2 = ex.SpriteSheet.fromImageSource({
  image: resource.ps('csam00'),
  grid: {
    rows: 4,
    columns: 6,
    spriteWidth: 64,
    spriteHeight: 96
  }
})

class Player extends ex.Actor {
  public isMoving = false;
  public direction = Direction.Down;
  public sheets = [] as ex.SpriteSheet[]

  constructor (config?: ex.ActorArgs) {
    resource.ps('csam00').load()
    super({ ...config, anchor: ex.vec(0, 0), z:2 })
    
    this.graphics.add('walkup', ex.Animation.fromSpriteSheet(runSheet2, [0, 1, 2, 1, 0, 3, 4, 3], 33, ex.AnimationStrategy.Loop))
    this.graphics.add('walkdown', ex.Animation.fromSpriteSheet(runSheet2, [6, 7, 8, 7, 6, 9, 10, 9], 33, ex.AnimationStrategy.Loop))
    this.graphics.add('walkright', ex.Animation.fromSpriteSheet(runSheet2, [18, 19, 20, 19, 18, 21, 22, 18], 33, ex.AnimationStrategy.Loop))
    this.graphics.add('walkleft', ex.Animation.fromSpriteSheet(runSheet2, [12, 13, 14, 13, 12, 15, 16, 15], 33, ex.AnimationStrategy.Loop))

    this.graphics.add('stopup', runSheet2.getSprite(0, 0))
    this.graphics.add('stopdown', runSheet2.getSprite(0, 1))
    this.graphics.add('stopright', runSheet2.getSprite(0, 3))
    this.graphics.add('stopleft', runSheet2.getSprite(0, 2))

    this.graphics.use('stopdown')
  }

  public update (game: ex.Engine, delta: number) {





    
    if(this.actions.getQueue().isComplete()){
      this.graphics.use('stopdown')
      if(game.input.keyboard.isHeld(ex.Input.Keys.W)){
        this.graphics.use('walkup')
        this.actions.moveBy(ex.vec(0, -48), 400)

      } else if(game.input.keyboard.isHeld(ex.Input.Keys.S)){
        this.graphics.use('walkdown')
        this.actions.moveBy(ex.vec(0, 48), 400)
      } else if(game.input.keyboard.isHeld(ex.Input.Keys.A)){
        this.graphics.use('walkleft')
        this.actions.moveBy(ex.vec(-64, 0), 400)
      } else if(game.input.keyboard.isHeld(ex.Input.Keys.D)){
        this.graphics.use('walkright')
        //this.actions.moveBy(ex.vec(64, 0), 400)
        this.actions.moveBy(ex.vec(64, 0), 400)
      } 
    } 
  }

}

export const player = new Player()
