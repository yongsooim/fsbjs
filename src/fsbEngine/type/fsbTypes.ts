import { assetRootPath } from './const'
import * as ex from 'excalibur'

export const PlayerCharacter = { 
  can : 'can',
  miro : 'miro',
  sam : 'sam',
  sona : 'sona',
  jupa : 'jupa',
  par : 'par',
  sao : 'sao',
  pusa : 'pusa',
  pao : 'pao',
  son : 'son0',
  dit0 : 'dit0',
  jah0 : 'jah0',
  hec : 'hec',
  macm : 'macm',
  ninja : 'ninja',
  sadi : 'sadi',
  dit1 : 'dit1',
}

export enum Direction {
    Up = 'Up',
    Left = 'Left',
    Right = 'Right',
    Down = 'Down'
}

/** Convecrt Direction to Vector */
export const d2v = {
  Up : ex.Vector.Up,
  Left : ex.Vector.Left,
  Right : ex.Vector.Right,
  Down : ex.Vector.Down
}

export function v2d(v : ex.Vector) {
  if(v.equals(ex.Vector.Up)){
    return Direction.Up
  } else if (v.equals(ex.Vector.Left)){
    return Direction.Left
  } else if (v.equals(ex.Vector.Right)){
    return Direction.Right
  } else if (v.equals(ex.Vector.Down)){
    return Direction.Down
  }
}

// tile position (1 x 1 -> 64px x 48px)
export class FsbCoordinate {
    public fsbX: number;
    public fsbY: number;

    constructor (fsbX: number, fsbY: number) {
      this.fsbX = fsbX
      this.fsbY = fsbY
      this.x = fsbX * 64
      this.y = fsbY * 48
    }

    get x () {
      return this.fsbX * 64
    }

    set x (x) {
      this.x = x
      this.fsbX = x / 64
    }

    get y () {
      return this.fsbY * 48
    }

    set y (y) {
      this.y = y
      this.fsbY = y / 48
    }
}
