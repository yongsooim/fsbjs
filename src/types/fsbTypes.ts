import { TiledMapResource } from "@excaliburjs/plugin-tiled";


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

export class FsbMapResource extends TiledMapResource{

    constructor(public path: string){
        super(path)
        this.convertPath = (originPath: string, relativePath: string) => {
               return relativePath;
        }
   }
}