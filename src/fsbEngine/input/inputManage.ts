import { Engine, Entity, Input } from 'excalibur'
import { game } from '../../index'
import { Direction } from '../type/fsbTypes'

export declare enum FsbKey {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
  Enter = 'Enter',
  Esc = 'Esc',
  Shift = 'Shift',
  C = 'C',
  None = 'None'
}

/** Direction to FsbKey */
export function d2k(direction: Direction) {
  if(direction === Direction.Up || direction === Direction.Down || direction === Direction.Left || direction === Direction.Right){
    return direction as string as FsbKey
  } else {
    return FsbKey.None
  }
}

/** FsbKey to Direction */
export function k2d(key: FsbKey) {
  if (key === FsbKey.Up || key === FsbKey.Down || key === FsbKey.Left || key === FsbKey.Right) {
    return key as string as Direction
  } else {
    return Direction.None
  }
}

/** to keyboard input */
export function d2key(direction: Direction) {
  if (direction === Direction.Up) {
    return Input.Keys.Up
  } else if (direction === Direction.Down) {
    return Input.Keys.Down
  } else if (direction === Direction.Left) {
    return Input.Keys.Left
  } else if (direction === Direction.Right) {
    return Input.Keys.Right
  } else {
    console.log('error')
    throw Error('Not supported direction ')
  }
}

class InputManager extends Entity {

  public isPressed = {
    Up: false,
    Down: false,
    Left: false,
    Right: false,
    Enter: false,
    Esc: false,
    C: false,
    Shift: false
  }

  constructor(){
    super()
  }

  /** Updating fsb keys */
  update(game: Engine, delta: number) {
    if (game.input.keyboard.isHeld(Input.Keys.Up) || game.input.keyboard.isHeld(Input.Keys.W) || game.input.keyboard.isHeld(Input.Keys.KeyW)) {
      this.isPressed.Up = true
    } else {
      this.isPressed.Up = false
    }

    if (game.input.keyboard.isHeld(Input.Keys.Down) || game.input.keyboard.isHeld(Input.Keys.S) || game.input.keyboard.isHeld(Input.Keys.KeyS)) {
      this.isPressed.Down = true
    } else {
      this.isPressed.Down = false
    }

    if (game.input.keyboard.isHeld(Input.Keys.Left) || game.input.keyboard.isHeld(Input.Keys.A) || game.input.keyboard.isHeld(Input.Keys.KeyA)) {
      this.isPressed.Left = true
    } else {
      this.isPressed.Left = false
    }

    if (game.input.keyboard.isHeld(Input.Keys.Right) || game.input.keyboard.isHeld(Input.Keys.D) || game.input.keyboard.isHeld(Input.Keys.KeyD)) {
      this.isPressed.Right = true
    } else {
      this.isPressed.Right = false
    }

    if (game.input.keyboard.isHeld(Input.Keys.Esc) || game.input.keyboard.isHeld(Input.Keys.Escape) || game.input.keyboard.isHeld(Input.Keys.Numpad0)) {
      this.isPressed.Esc = true
    } else {
      this.isPressed.Esc = false
    }

    if (game.input.keyboard.isHeld(Input.Keys.Space) || game.input.keyboard.isHeld(Input.Keys.Enter)) {
      this.isPressed.Enter = true
    } else {
      this.isPressed.Enter = false
    }

    if (game.input.keyboard.isHeld(Input.Keys.ShiftLeft) || game.input.keyboard.isHeld(Input.Keys.ShiftRight)) {
      this.isPressed.Shift = true
    } else {
      this.isPressed.Shift = false
    }

    if (game.input.keyboard.isHeld(Input.Keys.C) || game.input.keyboard.isHeld(Input.Keys.KeyC)) {
      this.isPressed.C = true
    } else {
      this.isPressed.C = false
    }
  }

  isDirectionPressed(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        return this.isPressed.Up
      case Direction.Down:
        return this.isPressed.Down
      case Direction.Left:
        return this.isPressed.Left
      case Direction.Right:
        return this.isPressed.Right
    }
  }

  /** It decides priority when multiple direction key is pressed at the same time */
  isAnyDirectionPressed(){
    if(this.isPressed.Up){
      return Direction.Up
    } else if(this.isPressed.Down){
      return Direction.Down
    } else if(this.isPressed.Left){
      return Direction.Left 
    } else if(this.isPressed.Right){
      return Direction.Right
    } else {
      return Direction.None
    }
  }
}

export let input = new InputManager()
