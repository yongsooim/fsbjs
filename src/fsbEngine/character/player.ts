import { SpriteSheet, Actor, Vector, Sprite, vec, ActorArgs, Engine, Input, AnimationStrategy, Animation } from 'excalibur'
import { FsbCoordinate, Direction, d2v, PlayerCharacter, v2i, fc2i, v2fc } from '../type/fsbTypes'
import { resource } from '../../resource/ResourceManage'
import { AnimationfromSpriteSheet } from '../../resource/util/fsbAnimationUtil'
import { game } from '../..'
import { FsbMapResource } from '../../resource/util/fsbMapResource'

const playerWalkSheet = Object.values(PlayerCharacter).map(value => {
  return SpriteSheet.fromImageSource({
    image: resource.ps('c' + value + '00'),
    grid: {
      rows: 4,
      columns: 6,
      spriteWidth: 64,
      spriteHeight: 96
    }
  })
})

const shadow = SpriteSheet.fromImageSource({
  image: resource.pcx('shadow'),
  grid: {
    rows: 7,
    columns: 1,
    spriteWidth: 48,
    spriteHeight: 20
  }
})

class Player extends Actor {
  public isRightFoot = false // repeating left/right foot
  public moveTarget: Vector
  public direction = Direction.Down
  public oldDirection = Direction.Down
  public party = [...Object.values(PlayerCharacter)]
  public walkAnimation = [] as Animation[]
  public fsbPos: FsbCoordinate
  public currentMap: FsbMapResource

  private speed = 500

  private _isMoving = false
  set isMoving (moving: boolean) {
    this._isMoving = moving
    if (this._isMoving) {
      // initial move
      this.walkAnimation[this.direction].reset()
      this.walkAnimation[this.direction].goToFrame(this.isRightFoot ? 0 : 4)
      this.graphics.use(this.walkAnimation[this.direction])
    } else {
      // stop move
      this.graphics.use('stop' + this.direction)
    }
  }
  get isMoving () {
    return this._isMoving
  }

  private _showingCharacterIndex = 0
  set showingCharacterIndex (index: number) {
    if (index >= 0 && index < this.party.length) {
      this._showingCharacterIndex = index
    } else {
      this._showingCharacterIndex = 0
    }
  }
  get showingCharacterIndex () {
    return this._showingCharacterIndex
  }

  public transitionQueue = [] as Sprite[] // 방향 전환할때 대각선 방향 스프라이트 보여주기 위한 큐
  public focusActor = new Actor() // anchor가 0, 0 이므로 카메라가 캐릭터 중앙에 포커스 위치하도록 보정해주기 위한 액터

  get vec () {
    return d2v[this.direction]
  }

  /** return pixel per tile for direction */
  get d2unit () {
    if (this.direction === Direction.Up || this.direction === Direction.Down) {
      return 64 // 2 2 2 2  2 2
    } else {
      return 48 // 2 2 2 2  3
    }
  }

  constructor (config?: ActorArgs, fsbPos = new FsbCoordinate(5, 5)) {
    resource.load(
      Object.values(PlayerCharacter).map(value => { return resource.ps('c' + value + '00') })
    )
    super({ ...config, anchor: vec(0, 0), z: 2 }) // z is 2 for temp

    this.pos = fsbPos.v
    this.setSheet()
    this.graphics.use('stopDown')
    this.graphics.layers.create({ name: 'shadow', order: -1, offset: vec(8, 76) })
    this.graphics.layers.get('shadow').use(shadow.getSprite(0, 6))
    this.graphics.offset = vec(0, -48) // 캐릭터가 밟고 있는 타일의 좌상단 픽셀좌표와 위치좌표를 정렬시키기 위한 오프셋
  }

  update (game: Engine, delta: number) {
    super.update(game, delta)
    this.checkShowingCharacterSwap()
    this.moveProc(delta) // move process
    this.focusActor.pos = this.pos.add(vec(32, 0))
  }

  checkShowingCharacterSwap () {
    if (game.input.keyboard.wasPressed(Input.Keys.C)) {
      // showing character change
      this.showingCharacterIndex++
      const currentFrame = this.walkAnimation[this.direction].currentFrameIndex
      this.setSheet()
      if (this.isMoving) {
        this.graphics.use(this.walkAnimation[this.direction])
        this.walkAnimation[this.direction].goToFrame(currentFrame)
      } else {
        this.graphics.use('stop' + this.direction)
      }
    }
  }

  /** character moving process */
  moveProc (delta: number) {
    if (this.isMoving) {
      this.checkWhileMove(delta)
    } else { // isMoving false
      this.checkInitialMove(delta)
    }
  }

  checkWhileMove (delta: number) {
    if (this.direction === Direction.Up) {
      if (game.input.keyboard.isHeld(Input.Keys.Up)) {
        if (this.moveTarget.y > this.pos.y - this.speed * delta / 1000) { // exceeds move target and key held
          const tempMoveTarget = this.moveTarget.add(vec(0, -48))
          if (this.checkMoveTarget(tempMoveTarget)) {
            this.moveTarget = tempMoveTarget
            this.isRightFoot = !this.isRightFoot
            this.pos.y -= this.speed * delta / 1000
          } else {
            this.arriveTarget()
          }
        } else {
          this.pos.y -= this.speed * delta / 1000 // normal move between tile while key held
        }
      } else {
        if (this.moveTarget.y > this.pos.y - this.speed * delta / 1000) { // exceeds move target and no key held
          this.arriveTarget()
        } else {
          this.pos.y -= this.speed * delta / 1000 // normal move between tile while no key held
        }
      }
    } else if (this.direction === Direction.Down) {
      if (game.input.keyboard.isHeld(Input.Keys.Down)) {
        if (this.moveTarget.y < this.pos.y + this.speed * delta / 1000) { // exceeds move target and key held
          const tempMoveTarget = this.moveTarget.add(vec(0, 48))
          if (this.checkMoveTarget(tempMoveTarget)) {
            this.moveTarget = tempMoveTarget
            this.isRightFoot = !this.isRightFoot
            this.pos.y += this.speed * delta / 1000
          } else {
            this.arriveTarget()
          }
        } else {
          this.pos.y += this.speed * delta / 1000 // normal move between tile while key held
        }
      } else {
        if (this.moveTarget.y < this.pos.y + this.speed * delta / 1000) { // exceeds move target and no key held
          this.arriveTarget()
        } else {
          this.pos.y += this.speed * delta / 1000
        }
      }
    } else if (this.direction === Direction.Left) {
      if (game.input.keyboard.isHeld(Input.Keys.Left)) {
        if (this.moveTarget.x > this.pos.x + this.speed * delta / 1000) { // exceeds move target with key
          const tempMoveTarget = this.moveTarget.add(vec(-64, 0))
          if (this.checkMoveTarget(tempMoveTarget)) {
            this.moveTarget = tempMoveTarget
            this.isRightFoot = !this.isRightFoot
            this.pos.x -= this.speed * delta / 1000
          } else {
            this.arriveTarget()
          }
        } else { // normal move between tiles
          this.pos.x -= this.speed * delta / 1000
        }
      } else {
        if (this.moveTarget.x > this.pos.x + this.speed * delta / 1000) { // exeeds with no key
          this.arriveTarget()
        } else {
          this.pos.x -= this.speed * delta / 1000 // normal move with no key
        }
      }
    } else if (this.direction === Direction.Right) {
      if (game.input.keyboard.isHeld(Input.Keys.Right)) {
        if (this.moveTarget.x < this.pos.x + this.speed * delta / 1000) { // exceeds with key
          const tempMoveTarget = this.moveTarget.add(vec(64, 0))
          if (this.checkMoveTarget(tempMoveTarget)) {
            this.moveTarget = tempMoveTarget
            this.isRightFoot = !this.isRightFoot
            this.pos.x += this.speed * delta / 1000
          } else {
            this.arriveTarget()
          }
        } else { // between tiles with key
          this.pos.x += this.speed * delta / 1000
        }
      } else {
        if (this.moveTarget.x < this.pos.x + this.speed * delta / 1000) { // exceeds wihout key
          this.arriveTarget()
        } else { // between tiles without key
          this.pos.x += this.speed * delta / 1000
        }
      }
    }
  }

  checkInitialMove (delta: number) {
    const needBlockCheck = false

    // check move command
    if (game.input.keyboard.isHeld(Input.Keys.Up)) {
      // check block
      const tempMoveTarget = this.pos.add(vec(0, -48))
      this.direction = Direction.Up
      if (this.checkMoveTarget(tempMoveTarget)) {
        this.moveTarget = tempMoveTarget
        this.isMoving = true
      } else {
        this.graphics.use('stop' + this.direction)
      }
    } else if (game.input.keyboard.isHeld(Input.Keys.Down)) {
      const tempMoveTarget = this.pos.add(vec(0, 48))
      this.direction = Direction.Down
      if (this.checkMoveTarget(tempMoveTarget)) {
        this.moveTarget = tempMoveTarget
        this.isMoving = true
      } else {
        this.graphics.use('stop' + this.direction)
      }
    } else if (game.input.keyboard.isHeld(Input.Keys.Left)) {
      const tempMoveTarget = this.pos.add(vec(-64, 0))
      this.direction = Direction.Left
      if (this.checkMoveTarget(tempMoveTarget)) {
        this.moveTarget = tempMoveTarget
        this.isMoving = true
      } else {
        this.graphics.use('stop' + this.direction)
      }
    } else if (game.input.keyboard.isHeld(Input.Keys.Right)) {
      const tempMoveTarget = this.pos.add(vec(64, 0))
      this.direction = Direction.Right
      if (this.checkMoveTarget(tempMoveTarget)) {
        this.moveTarget = tempMoveTarget
        this.isMoving = true
      } else {
        this.graphics.use('stop' + this.direction)
      }
    }

    // need to add block check of moveTarget
    if (this.isMoving) {
      // initial move
      switch (this.direction) {
      case Direction.Up:
        this.pos.y -= this.speed * delta / 1000
        break
      case Direction.Down:
        this.pos.y += this.speed * delta / 1000
        break
      case Direction.Left:
        this.pos.x -= this.speed * delta / 1000
        break
      case Direction.Right:
        this.pos.x += this.speed * delta / 1000
        break
      }
    }
  }

  /** returns true if can move.
   *
   * It should be changed to semantic number (map move, npc, box etc...)
   * */
  checkMoveTarget (v: Vector) {
    const cols = game.currentScene.tileMaps[0].cols // cols of current map
    const index = v2i(v, cols) // index of move target
    try {
      console.log(this.currentMap.move.data.z0[index])
      if (index < 0 || index >= this.currentMap.move.data.z0.length) { // check coordinate is out of the map
        throw Error
      }
    } catch (e) {
      console.log(e)
    }

    if (this.currentMap.move.data.z0[index] === 0) {
      return true
    } else {
      return false
    }
  }

  arriveTarget () {
    this.pos = this.moveTarget
    this.isMoving = false
    this.isRightFoot = !this.isRightFoot
  }

  setSheet () {
    this.walkAnimation['Up'] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex], [1, 2, 1, 0, 3, 4, 3, 0], 33, AnimationStrategy.Loop)
    this.walkAnimation['Down'] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex], [8, 7, 6, 9, 10, 9, 6, 7], 33, AnimationStrategy.Loop)
    this.walkAnimation['Left'] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex], [14, 13, 12, 15, 16, 15, 12, 13], 33, AnimationStrategy.Loop)
    this.walkAnimation['Right'] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex], [20, 19, 18, 21, 22, 21, 18, 19], 33, AnimationStrategy.Loop)

    this.graphics.add('stop' + 'Up', playerWalkSheet[this.showingCharacterIndex].getSprite(0, 0))
    this.graphics.add('stop' + 'Down', playerWalkSheet[this.showingCharacterIndex].getSprite(0, 1))
    this.graphics.add('stop' + 'Left', playerWalkSheet[this.showingCharacterIndex].getSprite(0, 2))
    this.graphics.add('stop' + 'Right', playerWalkSheet[this.showingCharacterIndex].getSprite(0, 3))
  }
}

export const player = new Player({ name: 'player' })
