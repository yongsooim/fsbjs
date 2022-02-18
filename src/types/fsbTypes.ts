import { TiledMapResource } from "@excaliburjs/plugin-tiled";
import {assetRootPath} from "./const"

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
            // customized for static file server

            const relativeSplit = relativePath.split('/')
            const fileName = relativeSplit[relativeSplit.length - 1]
            let returnPath: string

            if(fileName.includes('.png')){
                returnPath = assetRootPath + 'mapset/png/' + fileName.split('.')[0].toUpperCase() + '.png'
            } else if (fileName.includes('.tsj')){
                returnPath = assetRootPath + 'mapset/tsj/' + fileName
            } else {
                //error
            }
            console.log(returnPath)
            return returnPath;
        }
   }
}

