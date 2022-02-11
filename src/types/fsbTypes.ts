
export enum Direction {
    UP = "UP",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    DOWN = "DOWN"
}

export class Coordinate {
    public x = 0;
    public y = 0;

    constructor(_x: number, _y: number) {
        this.x = _x
        this.y = _y
    }
}
