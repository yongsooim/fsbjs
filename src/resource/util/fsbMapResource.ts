import { TiledMapResource } from '@excaliburjs/plugin-tiled'
import { assetRootPath } from '../../fsbEngine/type/const'
import { Resource } from 'excalibur'

export class FsbMapResource extends TiledMapResource {
  public mapName : string
  public width : number // tile unit
  public height : number // tile unit
  public move : any

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

  load () {
    const retPromise = super.load()
    // todo : need to add read map info

    //this.move = new Resource((assetRootPath + 'mapset/png/' + this.path.split('/')[this.path.split('/').length - 1].split('.')[0] + '.json'), 'json')

    //const retPromise2 = this.move.load()

    return retPromise
  }
}
