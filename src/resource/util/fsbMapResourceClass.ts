import { TiledMapResource } from '@excaliburjs/plugin-tiled'
import { assetRootPath } from '../../fsbEngine/type/const'

export class FsbMapResource extends TiledMapResource {
  public mapName = 'DefaultMapName'
  public width : number
  public height : number
  public mapMoveS = [] as number[][] // Move property
  public mapMoveP = [] as number[][] 
  
  // todo : need to add set pos, set direction according to toMap, fromMap

  constructor (public path: string) {
    super(path)
    this.convertPath = (originPath: string, relativePath: string) => {
      // customized for static file server

      const relativeSplit = relativePath.split('/')
      const fileName = relativeSplit[relativeSplit.length - 1]
      let returnPath: string

      if (fileName.includes('.png')) {
        returnPath = assetRootPath + 'mapset/png/' + fileName.split('.')[0] + '.png'
      } else if (fileName.includes('.tsj')) {
        returnPath = assetRootPath + 'mapset/tsj/' + fileName
      } else {
        // error
      }
      return returnPath
    }
  }

  load(){
    let retPromise = super.load()
    // todo : need to add read map info
    return retPromise
  }
}
