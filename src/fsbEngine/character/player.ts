import * as ex from "excalibur";
import { FsbCoordinate, Direction, d2v, PlayerCharacter } from "../type/fsbTypes";
import { resource } from "../../resource/resourceManage";
import {AnimationfromSpriteSheet} from '../../resource/util/fsbAnimationUtil'

const playerWalkSheet = Object.values(PlayerCharacter).map(value => { 
  return ex.SpriteSheet.fromImageSource({
    image: resource.ps("c" + value + "00"),
    grid: {
      rows: 4,
      columns: 6,
      spriteWidth: 64,
      spriteHeight: 96,
    },
    })}
  );
  
const shadow = ex.SpriteSheet.fromImageSource({
  image: resource.pcx("shadow"),
  grid: {
    rows: 7,
    columns: 1,
    spriteWidth: 48,
    spriteHeight: 20,
  },
});

declare enum Step { // 왼발, 오른발 번갈아가게 하기 위함
  First = "First", 
  Second = "Second"
}
class Player extends ex.Actor {
  public step = Step.First // left step, right step

  public moveTarget: ex.Vector
  public direction = Direction.Down
  public oldDirection = Direction.Down
  public party  = [...Object.values(PlayerCharacter)]
  private speed = 500

  private _isMoving = false
  set isMoving(moving: boolean){
    this._isMoving = moving
    if(this._isMoving){
      // initial move
      this.walkAnimation["walk" + this.direction ].reset()
      this.walkAnimation["walk" + this.direction ].goToFrame((this.step === Step.First) ? 0 : 4)
      this.graphics.use(this.walkAnimation["walk" + this.direction ])
    } else {
      // stop move
      this.graphics.use('stop' + this.direction)
    }
  }
  get isMoving(){
    return this._isMoving
  }


  private _showingCharacterIndex = 0
  set showingCharacterIndex(index : number){
    if(0 <= index && index < this.party.length ){
      this._showingCharacterIndex = index
    } else {
      this._showingCharacterIndex = 0
    }
  }
  get showingCharacterIndex(){
    return this._showingCharacterIndex
  }
  public transitionQueue = [] as ex.Sprite[]  // 방향 전환할때 대각선 방향 스프라이트 보여주기 위한 큐
  public focusActor = new ex.Actor()

  get vec(){
    return d2v[this.direction]
  }

  /** return pixel per tile for direction */
  get d2unit(){
    if(this.direction == Direction.Up || this.direction == Direction.Down){
      return 64 // 2 2 2 2  2 2
    } else{
      return 48 // 2 2 2 2  3 
    }
  }
  
  walkAnimation = [] as ex.Animation[]
  
  constructor(config?: ex.ActorArgs) {
  
    resource.load(
      Object.values(PlayerCharacter).map(value => {return resource.ps("c" + value + "00")})
    )
    super({ ...config, anchor: ex.vec(0, 0), z: 2 });

    // graphics name : walk|stop + Up|Down|Right|Left

    this.setSheet()
    this.graphics.use("stopDown");

    this.graphics.layers.create({ name : 'shadow', order : -1, offset: ex.vec(8,76)})
    this.graphics.layers.get('shadow').use(shadow.getSprite(0,6))

    this.graphics.offset = ex.vec(0, -48) // 캐릭터가 밟고 있는 타일의 좌상단 픽셀좌표와 위치좌표를 정렬시키기 위한 오프셋
  }
  
  update(game: ex.Engine, delta: number) {


    //console.log(this.durationPerWalkFrameVertical)
    super.update(game, delta)

    if(game.input.keyboard.wasPressed(ex.Input.Keys.C)){
      // showing character change

      this.showingCharacterIndex++
      let currentFrame = this.walkAnimation["walk" + this.direction ].currentFrameIndex

      this.setSheet()
      
      if(this.isMoving){
        this.graphics.use(this.walkAnimation["walk" + this.direction ])
        this.walkAnimation["walk" + this.direction ].goToFrame(currentFrame)
      } else {
        this.graphics.use("stop" + this.direction)
      }
    }

    this.focusActor.pos = this.pos.add(ex.vec(32, 0))

    if(this.isMoving){
      if(this.direction == Direction.Up){
        if(game.input.keyboard.isHeld(ex.Input.Keys.Up)){
          if(this.moveTarget.y > this.pos.y - this.speed * delta / 1000){  // exceeds move target and key held
            this.moveTarget.y -= 48  // set next move target
            this.toggleStep()
          }
          this.pos.y -= this.speed * delta / 1000 // normal move between tile while key held
        } else {
          if(this.moveTarget.y > this.pos.y - this.speed * delta / 1000){ // exceeds move target and no key held
            this.pos.y = this.moveTarget.y
            this.isMoving = false
            this.toggleStep()
          } else { 
            this.pos.y -= this.speed * delta / 1000 // normal move between tile while no key held
          }
        }
      } else if(this.direction == Direction.Down){
        if(game.input.keyboard.isHeld(ex.Input.Keys.Down)){
          if(this.moveTarget.y < this.pos.y + this.speed * delta / 1000){// exceeds move target and key held
            this.moveTarget.y += 48 // set next move target
            this.toggleStep()
          }
          this.pos.y += this.speed * delta / 1000 // normal move between tile while key held
        } else {
          if(this.moveTarget.y < this.pos.y + this.speed * delta / 1000){ // exceeds move target and no key held
            this.pos.y = this.moveTarget.y
            this.isMoving = false
          } else {
            this.pos.y += this.speed * delta / 1000
          }
        }
      } else if(this.direction == Direction.Left){

        if(game.input.keyboard.isHeld(ex.Input.Keys.Left)){
          if(this.moveTarget.x > this.pos.x + this.speed * delta / 1000){
            this.moveTarget.x -= 64
          }
          this.pos.x -= this.speed * delta / 1000
        } else {
          if(this.moveTarget.x > this.pos.x + this.speed * delta / 1000){
            this.pos.x = this.moveTarget.x
            this.isMoving = false

          } else {
            this.pos.x -= this.speed * delta / 1000
          }
        }
      } else if(this.direction == Direction.Right){

        if(game.input.keyboard.isHeld(ex.Input.Keys.Right)){
          if(this.moveTarget.x < this.pos.x + this.speed * delta / 1000){
            this.moveTarget.x += 64
          }
          this.pos.x += this.speed * delta / 1000
        } else {
          if(this.moveTarget.x < this.pos.x + this.speed * delta / 1000){
            this.pos.x = this.moveTarget.x
            this.isMoving = false
          } else {
            this.pos.x += this.speed * delta / 1000
          }
        }
      }
    } else { // isMoving false

      let needBlockCheck = false

      // check move command
      if(game.input.keyboard.isHeld(ex.Input.Keys.Up)){
        this.moveTarget = this.pos.add(ex.vec(0, -48))
        this.direction = Direction.Up
        this.isMoving = true
      } else if (game.input.keyboard.isHeld(ex.Input.Keys.Down)){
        this.moveTarget = this.pos.add(ex.vec(0, 48))
        this.direction = Direction.Down
        this.isMoving = true
      } else if (game.input.keyboard.isHeld(ex.Input.Keys.Left)){
        this.moveTarget = this.pos.add(ex.vec(-64, 0))
        this.direction = Direction.Left
        this.isMoving = true
      } else if (game.input.keyboard.isHeld(ex.Input.Keys.Right)){                
        this.moveTarget = this.pos.add(ex.vec(64, 0))
        this.direction = Direction.Right
        this.isMoving = true
      }
      
      // need to add block check of moveTarget
      if(this.isMoving){
        // initial move
        switch(this.direction){
          case Direction.Up: 
            this.pos.y -= this.speed * delta / 1000
            break;
          case Direction.Down: 
            this.pos.y += this.speed * delta / 1000
            break;
          case Direction.Left: 
            this.pos.x -= this.speed * delta / 1000
            break;
          case Direction.Right: 
            this.pos.x += this.speed * delta / 1000
            break;
        }
      }
    }
  }

  toggleStep(){
    if(this.step == Step.First) {
      this.step = Step.Second
    } else if(this.step == Step.Second) {
      this.step = Step.First
    }
  }

  setSheet(){
    this.walkAnimation["walkUp"] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[0, 1, 2, 1, 0, 3, 4, 3],33,ex.AnimationStrategy.Loop)
    this.walkAnimation["walkDown"] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[7, 8, 7, 6 , 9, 10, 9, 6],33,ex.AnimationStrategy.Loop)
    this.walkAnimation["walkLeft"] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[13, 14, 13, 12 , 15, 16, 15, 12], 33,ex.AnimationStrategy.Loop)
    this.walkAnimation["walkRight"] = AnimationfromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[19, 20, 19, 18, 21, 22, 21, 18 ],33 ,ex.AnimationStrategy.Loop)

    this.graphics.add("stopUp", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 0));
    this.graphics.add("stopDown", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 1));
    this.graphics.add("stopLeft", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 2));
    this.graphics.add("stopRight", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 3));

    //this.walkAnimation["test"] = ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[0, 1, 2, 3, 2, 1,2, 3,2 , 0], 33,ex.AnimationStrategy.Loop)

  }
}

export const player = new Player({name:'player'});
