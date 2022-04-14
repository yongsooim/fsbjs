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
    Down = 'Down'
}

// tile position (1 x 1 -> 64px x 48px)
export class FsbCoordinate {
  public x: number;
  public y: number;

  constructor (vOrfsbX: Vector|number, fsbY?: number) {
    if (typeof vOrfsbX === 'number') {
      this.x = vOrfsbX
      this.y = fsbY
    } else {
      this.x = vOrfsbX.x / 64
      this.y = vOrfsbX.y / 48
    }
  }

  get v () {
    return vec(this.x * 64, this.y * 48)
  }
}

/** Convecrt Direction to Vector */
export function d2v (d: Direction) {
  if (d === Direction.Up) {
    return Vector.Up
  } else if (d === Direction.Left) {
    return Vector.Left
  } else if (d === Direction.Right) {
    return Vector.Right
  } else if (d === Direction.Down) {
    return Vector.Down
  }
}

/** direction to move target */
export function d2mt (d: Direction) {
  if (d === Direction.Up) {
    return Vector.Up.scale(48)
  } else if (d === Direction.Left) {
    return Vector.Left.scale(64)
  } else if (d === Direction.Right) {
    return Vector.Right.scale(48)
  } else if (d === Direction.Down) {
    return Vector.Down.scale(64)
  }
}

/** Convecrt Vector to Direction */
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
  return new FsbCoordinate(index % cols, Math.ceil(index / cols))
}

/** index of array to fsb coordinate */
export function fc2i (fc : FsbCoordinate, cols:number) {
  return fc.x + fc.y * cols
}

/** vector to index of array */
export function v2i (v: Vector, cols:number) {
  return v.x / 64 + v.y / 48 * cols
}
