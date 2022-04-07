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

class Player extends ex.Actor {
  public isMoving = false
  public speed = 430 // pixels per second. 
  public moveTarget: ex.Vector
  public direction = Direction.Down
  public oldDirection = Direction.Down
  public party  = [...Object.values(PlayerCharacter)]
  public showingCharacterIndex = 0
  
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
      return 64
    } else{
      return 48
    }
  }

  constructor(config?: ex.ActorArgs) {
  
    resource.load([

      ...Object.values(PlayerCharacter).map(v=>{return resource.ps("c" + v + "00")}),

      resource.pcx("shadow")
    ])
    super({ ...config, anchor: ex.vec(0, 0), z: 2 });

    // graphics name : walk|stop + Up|Down|Right|Left

    this.graphics.add("walkUp", ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[1, 2, 1, 0, 3, 4, 3, 0],33,ex.AnimationStrategy.Loop));
    this.graphics.add("walkDown", ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[7, 8, 7, 6, 9, 10, 9, 6 ],33,ex.AnimationStrategy.Loop));
    this.graphics.add("walkRight", ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[19, 20, 19, 18, 21, 22, 21, 18],33,ex.AnimationStrategy.Loop));
    this.graphics.add("walkLeft", ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[13, 14, 13, 12, 15, 16, 15, 12],33,ex.AnimationStrategy.Loop));

    this.graphics.add("stopUp", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 0));
    this.graphics.add("stopDown", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 1));
    this.graphics.add("stopRight", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 3));
    this.graphics.add("stopLeft", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 2));

    this.graphics.use("stopDown");

    this.graphics.layers.create({ name : 'shadow', order : -1})
    this.graphics.layers.get('shadow').show(shadow.getSprite(0,6))
    this.graphics.layers.get('shadow').offset = ex.vec(8,76)

    this.graphics.offset = ex.vec(0, -48)
  }
  

  update(game: ex.Engine, delta: number) {
    super.update(game, delta)

    if(game.input.keyboard.wasPressed(ex.Input.Keys.C)){
      // showing character change

      this.showingCharacterIndex++
      if(this.showingCharacterIndex >= this.party.length){
        this.showingCharacterIndex = 0
      }

      console.log(playerWalkSheet)
      this.graphics.add("walkUp", ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[1, 2, 1, 0, 3, 4, 3, 0],33,ex.AnimationStrategy.Loop));
      this.graphics.add("walkDown", ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[7, 8, 7, 6, 9, 10, 9, 6 ],33,ex.AnimationStrategy.Loop));
      this.graphics.add("walkRight", ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[19, 20, 19, 18, 21, 22, 21, 18],33,ex.AnimationStrategy.Loop));
      this.graphics.add("walkLeft", ex.Animation.fromSpriteSheet(playerWalkSheet[this.showingCharacterIndex],[13, 14, 13, 12, 15, 16, 15, 12],33,ex.AnimationStrategy.Loop));
  
      this.graphics.add("stopUp", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 0));
      this.graphics.add("stopDown", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 1));
      this.graphics.add("stopRight", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 3));
      this.graphics.add("stopLeft", playerWalkSheet[this.showingCharacterIndex].getSprite(0, 2));
  
      if(this.isMoving){
        this.graphics.use("walk" + this.direction)
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
          }
          this.pos.y -= this.speed * delta / 1000
        } else {
          if(this.moveTarget.y > this.pos.y - this.speed * delta / 1000){
            this.pos.y = this.moveTarget.y
            this.isMoving = false
            this.graphics.use('stopUp')
          } else {
            this.pos.y -= this.speed * delta / 1000
          }
        }
      } else if(this.direction == Direction.Down){
        if(game.input.keyboard.isHeld(ex.Input.Keys.Down)){
          if(this.moveTarget.y < this.pos.y + this.speed * delta / 1000){
            this.moveTarget.y += 48
          }
          this.pos.y += this.speed * delta / 1000
        } else {
          if(this.moveTarget.y < this.pos.y + this.speed * delta / 1000){
            this.pos.y = this.moveTarget.y
            this.isMoving = false
            this.graphics.use('stopDown')
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
            this.graphics.use('stopLeft')
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
            this.graphics.use('stopRight')
          } else {
            this.pos.x += this.speed * delta / 1000
          }
        }
      }
    } else { // isMoving false

      let needBlockCheck = false

      if(game.input.keyboard.isHeld(ex.Input.Keys.Up)){
        this.moveTarget = this.pos.add(ex.vec(0, -48))
        this.direction = Direction.Up
        this.isMoving = true
        this.graphics.use('walkUp')
      } else if (game.input.keyboard.isHeld(ex.Input.Keys.Down)){
        this.moveTarget = this.pos.add(ex.vec(0, 48))
        this.direction = Direction.Down
        this.isMoving = true
        this.graphics.use('walkDown')
      } else if (game.input.keyboard.isHeld(ex.Input.Keys.Left)){
        this.moveTarget = this.pos.add(ex.vec(-64, 0))
        this.direction = Direction.Left
        this.isMoving = true
        this.graphics.use('walkLeft')
      } else if (game.input.keyboard.isHeld(ex.Input.Keys.Right)){                
        this.moveTarget = this.pos.add(ex.vec(64, 0))
        this.direction = Direction.Right
        this.isMoving = true
        this.graphics.use('walkRight')
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
}

export const player = new Player();
