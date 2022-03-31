import * as ex from 'excalibur'
import { FsbCoordinate, Direction } from '../type/fsbTypes'
import { resource } from '../../resource/resourceManage'

const runSheet2 = ex.SpriteSheet.fromImageSource({
  image: resource.asePs('csam00'),
  grid: {
    rows: 4,
    columns: 6,
    spriteWidth: 64,
    spriteHeight: 96
  }
})

export class Player extends ex.Actor {
  public isMoving: boolean;
  public position: FsbCoordinate;
  public direction: Direction;

  constructor (config?: ex.ActorArgs) {
    super({...config, anchor:ex.vec(0,0)})

    this.isMoving = false
    this.position = new FsbCoordinate(0, 0)
    this.direction = Direction.Down

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

  public update (engine: ex.Engine, delta: number) {
    if (this.isMoving) {
      switch (this.direction) {
      case Direction.Up:
        this.pos.y = this.pos.y - 8
        break

      case Direction.Left:
        this.pos.x = this.pos.x - 8
        break

      case Direction.Right:
        this.pos.x = this.pos.x + 8
        break

      case Direction.Down:
        this.pos.y = this.pos.y + 8
        break
      }

      if ((this.pos.x) % 64 === 0 && this.pos.y % 48 === 0 &&

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
        case Direction.Up:
          this.graphics.use('stopup')
          break

        case Direction.Down:
          this.graphics.use('stopdown')

          break

        case Direction.Left:
          this.graphics.use('stopleft')

          break

        case Direction.Right:
          this.graphics.use('stopright')

          break
        }
      }
    } else {
      if (engine.input.keyboard.isHeld(ex.Input.Keys.W) ||
        engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
        this.isMoving = true
        this.graphics.use('walkup')
        this.direction = Direction.Up
      } else if (engine.input.keyboard.isHeld(ex.Input.Keys.A) ||
        engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
        this.isMoving = true
        this.graphics.use('walkleft')
        this.direction = Direction.Left
      } else if (engine.input.keyboard.isHeld(ex.Input.Keys.S) ||
        engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
        this.isMoving = true
        this.graphics.use('walkdown')
        this.direction = Direction.Down
      } else if (engine.input.keyboard.isHeld(ex.Input.Keys.D) ||
        engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
        this.isMoving = true
        this.graphics.use('walkright')
        this.direction = Direction.Right
      }
    }
  }
}
