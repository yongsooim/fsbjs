import { SpriteSheet, Actor, Vector, Sprite, vec, ActorArgs, Engine, Input, AnimationStrategy, Animation } from 'excalibur'
import { FsbCoordinate, Direction, d2v, PlayerCharacter, v2i, fc2i, v2fc, d2mt } from '../type/fsbTypes'
import { resource } from '../../resource/ResourceManage'
import { AnimationfromSpriteSheet } from '../../resource/util/fsbAnimationUtil'
import { game } from '../..'
import { FsbMapResource } from '../../resource/util/fsbMapResource'
import { input } from '../input/inputManage'

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
  public moveTarget: Vector // x should be N * 48,  y should be M * 64
  public direction = Direction.Down
  public oldDirection = Direction.Down
  public party = [...Object.values(PlayerCharacter)] // characters in current party
  public walkAnimation = [] as Animation[]
  public fsbPos: FsbCoordinate // tile coordinate that player is occupying
  public currentMap: FsbMapResource

  private speed = 500
  private pixelPerMsSecond = this.speed / 1000

  private _isMoving = false
  set isMoving(moving: boolean) {
    this._isMoving = moving
    if (this._isMoving) {
      // initial move
      this.walkAnimation[this.direction].goToFrame(this.isRightFoot ? 0 : 4)
      this.walkAnimation[this.direction].reset()
      this.graphics.use(this.walkAnimation[this.direction])
    } else {
      // stop move
      this.graphics.use('stop' + this.direction)
    }
  }
  get isMoving() {
    return this._isMoving
  }

  private _showingCharacterIndex = 0
  set showingCharacterIndex(index: number) {
    if (index >= 0 && index < this.party.length) {
      this._showingCharacterIndex = index
    } else {
      this._showingCharacterIndex = 0
    }
  }
  get showingCharacterIndex() {
    return this._showingCharacterIndex
  }

  public transitionQueue = [] as Sprite[] // 방향 전환할때 대각선 방향 스프라이트 보여주기 위한 큐
  public focusActor = new Actor() // anchor가 0, 0 이므로 카메라가 캐릭터 중앙에 포커스 위치하도록 보정해주기 위한 액터

  get vec() {
    return d2v[this.direction]
  }

  /** return pixel per tile for direction */
  get d2unit() {
    if (this.direction === Direction.Up || this.direction === Direction.Down) {
      return 64 // 2 2 2 2  2 2
    } else {
      return 48 // 2 2 2 2  3
    }
  }

  constructor(config?: ActorArgs, fsbPos = new FsbCoordinate(5, 5)) {
    resource.load(
      Object.values(PlayerCharacter).map(value => { return resource.ps('c' + value + '00') })
    )
    super({ ...config, anchor: vec(0, 0), z: 2 }) // z is 2 for temp

    this.pos = fsbPos.worldCoordinates
    this.setSheet()
    this.graphics.use('stopDown')
    this.graphics.layers.create({ name: 'shadow', order: -1, offset: vec(8, 76) })
    this.graphics.layers.get('shadow').use(shadow.getSprite(0, 6))
    this.graphics.offset = vec(0, -48) // 캐릭터가 밟고 있는 타일의 좌상단 픽셀좌표와 위치좌표를 정렬시키기 위한 오프셋
  }

  public sum = 0
  public count = 0
  public oldDelta = 0
  update(game: Engine, delta: number) {
    if(this.oldDelta !== delta ){
      console.log(delta)
      this.oldDelta = delta
    }
    
    super.update(game, delta)
    this.checkShowingCharacterSwap()
    this.moveProc(delta) // move process
    this.focusActor.pos = this.pos.add(vec(32, 0))
  }

  checkShowingCharacterSwap() {
    if (input.isPressed.C) {
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

  public deltaPixel = 0
  /** character moving process */
  moveProc(delta: number) {
    this.deltaPixel = this.pixelPerMsSecond * delta
    if (this.isMoving) {
      this.checkWhileMove(this.deltaPixel)
    } else { // isMoving false
      this.checkInitialMove(this.deltaPixel)
    }
  }

  checkWhileMove(deltaPixel: number) {
    const deltaVector = d2v(this.direction).scale(deltaPixel)
      if (this.checkExceeds(this.pos, this.moveTarget, this.direction, deltaPixel)) { // exceeds move target
        this.isRightFoot = !this.isRightFoot
        const maybeMoveTarget = this.moveTarget.add(d2mt(this.direction))
        if (input.isDirectionPressed(this.direction)) { // key held
          if (this.checkMoveTarget(maybeMoveTarget)) { // check if can move forward
            this.moveTarget = maybeMoveTarget // update move target
            this.pos = this.pos.add(deltaVector) // move forward 
          } else { // cannot move to move target
            this.arriveTarget()
          }
        } else { // exceeds and no key held
          this.arriveTarget()
        }
      } else {
        this.pos = this.pos.add(deltaVector) // move forward, unstoppable normal move between tile
      }
  }

  /** returns true if move exceeds target */
  checkExceeds(currentPos: Vector, targetPos: Vector, direction: Direction, deltaPixel: number) {
    if ((direction === Direction.Up || direction === Direction.UpLeft || direction === Direction.UpRight) && (targetPos.y >= currentPos.y - deltaPixel)) {
      return true
    } else if ((direction === Direction.Down || direction === Direction.DownLeft || direction === Direction.DownRight) && (targetPos.y <= currentPos.y + deltaPixel)) {
      return true
    } else if (direction === Direction.Left && (targetPos.x >= currentPos.x - deltaPixel)) {
      return true
    } else if (direction === Direction.Right && (targetPos.x <= currentPos.x + deltaPixel)) {
      return true
    } else { 
      return false
    }
  }

  public inputDirection = Direction.None
  public maybeMoveTarget = vec(0, 0)
  checkInitialMove(deltaPixel: number) {
    this.inputDirection = input.isAnyDirectionPressed()
    if (this.inputDirection !== Direction.None) {
      this.direction = this.inputDirection
      this.maybeMoveTarget = this.pos.add(d2mt(this.direction))
      if (this.checkMoveTarget(this.maybeMoveTarget)) {
        this.moveTarget = this.maybeMoveTarget
        this.isMoving = true
      } else {
        this.graphics.use('stop' + this.direction)
      }
    }

    if (this.isMoving) {
      // initial move
      this.fsbPos = v2fc(this.moveTarget) // occupy target tile
      //this.pos = this.pos.add(d2v(this.direction).scale(deltaPixel))
    }
  }

  /** returns true if can move.
   *
   * It should be changed to semantic number (map move, npc, box etc...)
   * */
  checkMoveTarget(v: Vector) {
    const cols = game.currentScene.tileMaps[0].cols // cols of current map
    const index = v2i(v, cols) // index of move target
    try {
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

  checkMoveTargetByFc(fc: FsbCoordinate) {
    const cols = game.currentScene.tileMaps[0].cols // cols of current map
    const index = fc2i(fc, cols) // index of move target
    try {
      if (index < 0 || index >= this.currentMap.move.data.z0.length) { // check coordinate is out of the map
        throw Error
      }
    } catch (e) {
      console.log(e)
    }

    try {
      if (this.currentMap.move.data.z0[index] === 0) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
    }
  }

  arriveTarget() {
    this.pos = this.moveTarget
    this.isMoving = false
  }

  setSheet() {
    this.walkAnimation['Up'] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex], [1, 2, 1, 0, 3, 4, 3, 0], 2000 / 60 , AnimationStrategy.Loop)
    this.walkAnimation['Down'] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex], [8, 7, 6, 9, 10, 9, 6, 7], 2000 / 60 , AnimationStrategy.Loop)
    this.walkAnimation['Left'] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex], [14, 13, 12, 15, 16, 15, 12, 13], 2000 / 60 , AnimationStrategy.Loop)
    this.walkAnimation['Right'] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex], [20, 19, 18, 21, 22, 21, 18, 19], 2000 / 60 , AnimationStrategy.Loop)

    this.graphics.add('stop' + 'Up', playerWalkSheet[this.showingCharacterIndex].getSprite(0, 0))
    this.graphics.add('stop' + 'Down', playerWalkSheet[this.showingCharacterIndex].getSprite(0, 1))
    this.graphics.add('stop' + 'Left', playerWalkSheet[this.showingCharacterIndex].getSprite(0, 2))
    this.graphics.add('stop' + 'Right', playerWalkSheet[this.showingCharacterIndex].getSprite(0, 3))
  }
}

export const player = new Player({ name: 'player' })
