import { assetRootPath } from './const'

export enum PlayerCharacter {
    miro = '미로공주',
    sam = '삼장법사',
    sao = '사오정',
    dit = '복면남자',

}

export enum Direction {
    Up = 'Up',
    Left = 'Left',
    Right = 'Right',
    Down = 'Down'
}

export class Coordinate { // tile position (1 x 1 -> 64px x 48px)
    public x = 0;
    public y = 0;

    constructor (x: number, y: number) {
      this.x = x
      this.y = y
    }
}
