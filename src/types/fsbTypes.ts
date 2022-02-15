import { TiledMapResource } from "@excaliburjs/plugin-tiled";


export enum Direction {
    UP = "UP",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    DOWN = "DOWN"
}

export class Coordinate { // tile position (1 x 1 -> 64px x 48px)
    public x = 0;
    public y = 0;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export class FsbMapResource extends TiledMapResource{

    constructor(public path: string){
        super(path)
        this.convertPath = (originPath: string, relativePath: string) => {
               return relativePath; // use always absolute path
        }
   }
}

