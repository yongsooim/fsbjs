import * as ex from 'excalibur'
import * as fsb from '../type/fsbTypes'
import { resources } from '../resource/resourceManage'

const runSheet2 = ex.SpriteSheet.fromImageSource({
  image: resources.Image2,
  grid: {
    rows: 4,
    columns: 6,
    spriteWidth: 64,
    spriteHeight: 96
  }
})
export class Player extends ex.Actor {
    public isMoving: boolean;
    public position: fsb.Coordinate;
    public direction: fsb.Direction;

    constructor (config?: ex.ActorArgs) {
      super(config)

      this.isMoving = false
      this.position = new fsb.Coordinate(0, 0)
      this.direction = fsb.Direction.Down

      this.graphics.add('walkup', ex.Animation.fromSpriteSheet(runSheet2, [0, 1, 2, 1, 0, 3, 4, 3], 33, ex.AnimationStrategy.Loop))
      this.graphics.add('walkdown', ex.Animation.fromSpriteSheet(runSheet2, [6, 7, 8, 7, 6, 9, 10, 9], 33, ex.AnimationStrategy.Loop))
      this.graphics.add('walkright', ex.Animation.fromSpriteSheet(runSheet2, [18, 19, 20, 19, 18, 21, 22, 18], 33, ex.AnimationStrategy.Loop))
      this.graphics.add('walkleft', ex.Animation.fromSpriteSheet(runSheet2, [12, 13, 14, 13, 12, 15, 16, 15], 33, ex.AnimationStrategy.Loop))

      this.graphics.add('stopup', ex.Animation.fromSpriteSheet(runSheet2, [0], 33, ex.AnimationStrategy.Loop))
      this.graphics.add('stopdown', ex.Animation.fromSpriteSheet(runSheet2, [6], 33, ex.AnimationStrategy.Loop))
      this.graphics.add('stopright', ex.Animation.fromSpriteSheet(runSheet2, [18], 33, ex.AnimationStrategy.Loop))
      this.graphics.add('stopleft', ex.Animation.fromSpriteSheet(runSheet2, [12], 33, ex.AnimationStrategy.Loop))

      this.graphics.use('stopdown')
    }

    public update (engine: ex.Engine, delta: number) {
      if (this.isMoving) {
        switch (this.direction) {
        case fsb.Direction.Up:
          this.pos.y = this.pos.y - 8
          break

        case fsb.Direction.Left:
          this.pos.x = this.pos.x - 8
          break

        case fsb.Direction.Right:
          this.pos.x = this.pos.x + 8
          break

        case fsb.Direction.Down:
          this.pos.y = this.pos.y + 8
          break
        }

        if ((this.pos.x + 32) % 64 === 0 && this.pos.y % 48 === 0 &&

                !engine.input.keyboard.isHeld(ex.Input.Keys.W) &&
                !engine.input.keyboard.isHeld(ex.Input.Keys.A) &&
                !engine.input.keyboard.isHeld(ex.Input.Keys.S) &&
                !engine.input.keyboard.isHeld(ex.Input.Keys.D) &&
                !engine.input.keyboard.isHeld(ex.Input.Keys.Up) &&
                !engine.input.keyboard.isHeld(ex.Input.Keys.Down) &&
                !engine.input.keyboard.isHeld(ex.Input.Keys.Left) &&
                !engine.input.keyboard.isHeld(ex.Input.Keys.Right)
        ) {
          this.isMoving = false

          switch (this.direction) {
          case fsb.Direction.Up:
            this.graphics.use('stopup')
            break

          case fsb.Direction.Down:
            this.graphics.use('stopdown')

            break

          case fsb.Direction.Left:
            this.graphics.use('stopleft')

            break

          case fsb.Direction.Right:
            this.graphics.use('stopright')

            break
          }
        }
      } else {
        if (engine.input.keyboard.isHeld(ex.Input.Keys.W) ||
                engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
          this.isMoving = true
          this.graphics.use('walkup')
          this.direction = fsb.Direction.Up
        } else if (engine.input.keyboard.isHeld(ex.Input.Keys.A) ||
                engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
          this.isMoving = true
          this.graphics.use('walkleft')
          this.direction = fsb.Direction.Left
        } else if (engine.input.keyboard.isHeld(ex.Input.Keys.S) ||
                engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
          this.isMoving = true
          this.graphics.use('walkdown')
          this.direction = fsb.Direction.Down
        } else if (engine.input.keyboard.isHeld(ex.Input.Keys.D) ||
                engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
          this.isMoving = true
          this.graphics.use('walkright')
          this.direction = fsb.Direction.Right
        }
      }
    }
}
