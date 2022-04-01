import { assetRootPath } from './const'

export enum PlayerCharacter {
    Miro = '미로공주',
    Sam = '삼장법사',
    Sao = '사오정',
    Dit = '복면남자',

}

export enum Direction {
    Up = 'Up',
    Left = 'Left',
    Right = 'Right',
    Down = 'Down'
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
