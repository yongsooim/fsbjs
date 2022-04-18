import { assetRootPath } from './const'
import { vec, Vector } from 'excalibur'

export const PlayerCharacter = {
  miro: 'miro',
  sam: 'sam',
  sona: 'sona',
  jupa: 'jupa',
  sao: 'sao',
  pusa: 'pusa',
  pao: 'pao',
  son0: 'son0',
  dit1: 'dit1',
  jah0: 'jah0'
}

export enum Direction {
    Up = 'Up',
    Left = 'Left',
    Right = 'Right',
    Down = 'Down',
    UpLeft = 'UpLeft',
    UpRight = 'UpRight',
    DownLeft = 'DownLeft',
    DownRight = 'DownRight',
    None = 'None'
}

// tile position (1 x 1 -> 64px x 48px)
export class FsbCoordinate {
  public x: number;
  public y: number;

  constructor (vOrFsbX: Vector|number, fsbY?: number) {
    if (typeof vOrFsbX === 'number') {
      this.x = vOrFsbX
      this.y = fsbY
    } else {
      this.x = vOrFsbX.x / 64
      this.y = vOrFsbX.y / 48
    }
  }

  get worldCoordinates () {
    return vec(this.x * 64, this.y * 48)
  }
}

// v stands for vector
const vUp = Vector.Up
const vLeft = Vector.Left
const vRight = Vector.Right
const vDown = Vector.Down
const vUpLeft = vec(-4, -3).normalize() // diagonal unit vector
const vUpRight = vec(4, -3).normalize()
const vDownLeft = vec(-4, 3).normalize()
const vDownRight = vec(4, 3).normalize()

/** Convecrt Direction to unit Vector */
export function d2v (d: Direction) {
  if (d === Direction.Up) {
    return vUp
  } else if (d === Direction.Left) {
    return vLeft
  } else if (d === Direction.Right) {
    return vRight
  } else if (d === Direction.Down) {
    return vDown
  } else if (d === Direction.UpLeft) {
    return vUpLeft
  } else if (d === Direction.UpRight) {
    return vUpRight
  } else if (d === Direction.DownLeft) {
    return vDownLeft
  } else if (d === Direction.DownRight) {
    return vDownRight
  }
}

 // t stands for tile
const tUp = Vector.Up.scale(48)
const tLeft = Vector.Left.scale(64)
const tRight = Vector.Right.scale(64)
const tDown = Vector.Down.scale(48)
/** Convert Direction to move target diff vector to add */
export function d2mt (d: Direction) {
  if (d === Direction.Up) {
    return tUp
  } else if (d === Direction.Left) {
    return tLeft
  } else if (d === Direction.Right) {
    return tRight
  } else if (d === Direction.Down) {
    return tDown
  }
}

/** Convert Direction Vector to Direction */
export function v2d (v : Vector) {
  if (v.equals(Vector.Up)) {
    return Direction.Up
  } else if (v.equals(Vector.Left)) {
    return Direction.Left
  } else if (v.equals(Vector.Right)) {
    return Direction.Right
  } else if (v.equals(Vector.Down)) {
    return Direction.Down
  }
}

/** vector to fsb coordinate */
export function v2fc (v : Vector) {
  return new FsbCoordinate(v)
}

/** index of array to fsb coordinate */
export function i2fc (index : number, cols:number) {
  return new FsbCoordinate(index % cols, Math.floor(index / cols))
}

/** index of array to fsb coordinate */
export function fc2i (fc : FsbCoordinate, cols:number) {
  return fc.x + fc.y * cols
}

/** vector to index of array */
export function v2i (v: Vector, cols:number) {
  return v.x / 64 + v.y * cols / 48
}
