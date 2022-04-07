import * as ex from "excalibur";
import { FsbCoordinate, Direction, d2v, PlayerCharacter } from "../type/fsbTypes";
import { resource } from "../../resource/resourceManage";

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

declare enum Step {
  First = "First",
  Second = "Second"
}
class Player extends ex.Actor {
  public step = Step.First // left step, right step
  public isMoving = false
  public moveTarget: ex.Vector
  public direction = Direction.Down
  public oldDirection = Direction.Down
  public party  = [
    PlayerCharacter.dit,
    PlayerCharacter.jah,
    PlayerCharacter.son,
    PlayerCharacter.jupa,
    PlayerCharacter.miro,
    PlayerCharacter.pao,
    PlayerCharacter.pusa,
    PlayerCharacter.sam,
    PlayerCharacter.sao,
    PlayerCharacter.sona,
  ]
  public showingCharacterIndex = 0



  //if speed = 320,  5 tile per 1 second. 0.2 per 1 tile, 0.025 per 1 frame

  // 320 / 64 / 4
  private _speed = 500
  public durationPerWalkFrameHorizontal = 1000 * (64 / this._speed) / 4
  public durationPerWalkFrameVertical = 1000 * (48 / this._speed) / 4


  set speed(speed:number){
    this._speed = speed
    this.durationPerWalkFrameHorizontal = (64 / this._speed) / 4
    this.durationPerWalkFrameVertical = (48 / this._speed) / 4
  }

  get speed(){
    return this._speed
  }

  get showingCharacter(){
    return this.party[this.showingCharacterIndex]
  }
  public transitionQueue = [] as ex.Sprite[]  // 방향 전환할때 대각선 방향 스프라이트 보여주기 위한 큐
  public focusActor = new ex.Actor()


  get vec(){
    return d2v[this.direction]
  }

  /** return pixel per tile for direction */
  get d2unit(){
    if(this.direction == Direction.Up || this.direction == Direction.Down){
      return 64 // 2 2  2 2 2 2
    } else{
      return 48 // 3    2 2 2 2
    }
  }
  
  walkAnimation = [] as ex.Animation[]
  
  constructor(config?: ex.ActorArgs) {
  
    resource.load([
      resource.ps("cmiro00"),
      resource.ps("cson000"),
      resource.ps("cdit000"),
      resource.ps("cjah000"),
      resource.ps("csam00"),
      resource.ps("csona00"),
      resource.ps("cjupa00"),
      resource.ps("cpusa00"),
      resource.ps("csao00"),
      resource.ps("cpao00"),
      resource.pcx("shadow")
    ])
    super({ ...config, anchor: ex.vec(0, 0), z: 2 });

    // graphics name : walk|stop + Up|Down|Right|Left

    this.setSheet()
    this.graphics.use("stopDown");

    this.graphics.layers.create({ name : 'shadow', order : -1})
    this.graphics.layers.get('shadow').show(shadow.getSprite(0,6))
    this.graphics.layers.get('shadow').offset = ex.vec(7,78)

    this.graphics.offset = ex.vec(0, -48)
  }
  

  update(game: ex.Engine, delta: number) {
    console.log(this.durationPerWalkFrameVertical)
    super.update(game, delta)

    if(game.input.keyboard.wasPressed(ex.Input.Keys.C)){
      // showing character change

      this.showingCharacterIndex++
      if(this.showingCharacterIndex >= this.party.length){
        this.showingCharacterIndex = 0
      }
      let currentFrame = this.walkAnimation["walk" + this.direction + this.step].currentFrameIndex

      this.setSheet()
      
      if(this.isMoving){
        this.graphics.use(this.walkAnimation["walk" + this.direction + this.step])
        this.walkAnimation["walk" + this.direction + this.step].goToFrame(currentFrame)
      } else {
        this.graphics.use("stop" + this.direction)
      }
    }
    

    this.focusActor.pos = this.pos.add(ex.vec(32, 0))

    if(this.isMoving){
      if(this.direction == Direction.Up){
        if(game.input.keyboard.isHeld(ex.Input.Keys.Up)){
          if(this.moveTarget.y > this.pos.y - this.speed * delta / 1000){  // exceeds move target
            this.moveTarget.y -= 48
            this.toggleStep()
            this.graphics.use(this.walkAnimation["walk" + this.direction + this.step])
            this.walkAnimation["walk" + this.direction + this.step].reset()

          }
          this.pos.y -= this.speed * delta / 1000
        } else {
          if(this.moveTarget.y > this.pos.y - this.speed * delta / 1000){
            this.pos.y = this.moveTarget.y
            this.isMoving = false
            this.graphics.use('stopUp')
            this.toggleStep()

          } else {
            this.pos.y -= this.speed * delta / 1000
          }
        }
      } else if(this.direction == Direction.Down){
        if(game.input.keyboard.isHeld(ex.Input.Keys.Down)){
          if(this.moveTarget.y < this.pos.y + this.speed * delta / 1000){
            this.moveTarget.y += 48
            this.toggleStep()
            this.graphics.use(this.walkAnimation["walk" + this.direction + this.step])
            this.walkAnimation["walk" + this.direction + this.step].reset()
          }
          this.pos.y += this.speed * delta / 1000
        } else {
          if(this.moveTarget.y < this.pos.y + this.speed * delta / 1000){
            this.pos.y = this.moveTarget.y
            this.isMoving = false
            this.graphics.use('stopDown')
            this.toggleStep()
          } else {
            this.pos.y += this.speed * delta / 1000
          }
        }
      } else if(this.direction == Direction.Left){

        if(game.input.keyboard.isHeld(ex.Input.Keys.Left)){
          if(this.moveTarget.x > this.pos.x + this.speed * delta / 1000){
            this.moveTarget.x -= 64
            this.toggleStep()
            this.graphics.use(this.walkAnimation["walk" + this.direction + this.step])
            this.walkAnimation["walk" + this.direction + this.step].reset()

          }
          this.pos.x -= this.speed * delta / 1000
        } else {
          if(this.moveTarget.x > this.pos.x + this.speed * delta / 1000){
            this.pos.x = this.moveTarget.x
            this.isMoving = false
            this.graphics.use('stopLeft')
            this.toggleStep()
            this.graphics.use(this.walkAnimation["walk" + this.direction + this.step])
            this.walkAnimation["walk" + this.direction + this.step].reset()

          } else {
            this.pos.x -= this.speed * delta / 1000
          }
        }
      } else if(this.direction == Direction.Right){

        if(game.input.keyboard.isHeld(ex.Input.Keys.Right)){
          if(this.moveTarget.x < this.pos.x + this.speed * delta / 1000){
            this.moveTarget.x += 64
            this.toggleStep()
            this.graphics.use(this.walkAnimation["walk" + this.direction + this.step])
            this.walkAnimation["walk" + this.direction + this.step].reset()
          }
          this.pos.x += this.speed * delta / 1000
        } else {
          if(this.moveTarget.x < this.pos.x + this.speed * delta / 1000){
            this.pos.x = this.moveTarget.x
            this.isMoving = false
            this.graphics.use('stopRight')
            this.toggleStep()
          } else {
            this.pos.x += this.speed * delta / 1000
          }
        }
      }
    } else { // isMoving false

      let needBlockCheck = false

      if(game.input.keyboard.wasPressed(ex.Input.Keys.Up)){
        this.moveTarget = this.pos.add(ex.vec(0, -48))
        this.direction = Direction.Up
        this.isMoving = true
        this.graphics.use(this.walkAnimation["walk" + this.direction + this.step])
        this.walkAnimation["walk" + this.direction + this.step].reset()
      } else if (game.input.keyboard.wasPressed(ex.Input.Keys.Down)){
        this.moveTarget = this.pos.add(ex.vec(0, 48))
        this.direction = Direction.Down
        this.isMoving = true
        this.graphics.use(this.walkAnimation["walk" + this.direction + this.step])
        this.walkAnimation["walk" + this.direction + this.step].reset()
      } else if (game.input.keyboard.wasPressed(ex.Input.Keys.Left)){
        this.moveTarget = this.pos.add(ex.vec(-64, 0))
        this.direction = Direction.Left
        this.isMoving = true
        this.graphics.use(this.walkAnimation["walk" + this.direction + this.step])
        this.walkAnimation["walk" + this.direction + this.step].reset()
      } else if (game.input.keyboard.wasPressed(ex.Input.Keys.Right)){                
        this.moveTarget = this.pos.add(ex.vec(64, 0))
        this.direction = Direction.Right
        this.isMoving = true
        this.graphics.use(this.walkAnimation["walk" + this.direction + this.step])
        this.walkAnimation["walk" + this.direction + this.step].reset()
      }
      
      // need to add check block of moveTarget
      if(this.isMoving){
        switch(this.direction){  // initial move
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
    this.walkAnimation["walkUpFirst"] = ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[1, 2, 1, 0],this.durationPerWalkFrameVertical,ex.AnimationStrategy.Freeze)
    this.walkAnimation["walkDownFirst"] = ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[7, 8, 7, 6 ],this.durationPerWalkFrameVertical,ex.AnimationStrategy.Freeze)
    this.walkAnimation["walkRightFirst"] = ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[19, 20, 19, 18 ],this.durationPerWalkFrameHorizontal,ex.AnimationStrategy.Freeze)
    this.walkAnimation["walkLeftFirst"] = ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[13, 14, 13, 12 ], this.durationPerWalkFrameHorizontal,ex.AnimationStrategy.Freeze)

    this.walkAnimation["walkUpSecond"] = ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[3, 4, 3, 0],this.durationPerWalkFrameVertical,ex.AnimationStrategy.Freeze)
    this.walkAnimation["walkDownSecond"] = ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[9, 10, 9, 6],this.durationPerWalkFrameVertical,ex.AnimationStrategy.Freeze)
    this.walkAnimation["walkRightSecond"] = ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[21, 22, 21, 18,],this.durationPerWalkFrameHorizontal,ex.AnimationStrategy.Freeze)
    this.walkAnimation["walkLeftSecond"] = ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[15, 16, 15, 12, ],this.durationPerWalkFrameHorizontal,ex.AnimationStrategy.Freeze)

    this.graphics.add("stopUp", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 0));
    this.graphics.add("stopDown", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 1));
    this.graphics.add("stopRight", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 3));
    this.graphics.add("stopLeft", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 2));
  }
}

export const player = new Player();
