import { TiledMapResource } from '@excaliburjs/plugin-tiled'
import { assetRootPath } from '../../type/const'

export class FsbMapResource extends TiledMapResource {
  constructor (public path: string) {
    super(path)
    this.convertPath = (originPath: string, relativePath: string) => {
      // customized for static file server

      const relativeSplit = relativePath.split('/')
      const fileName = relativeSplit[relativeSplit.length - 1]
      let returnPath: string

      if (fileName.includes('.png')) {
        returnPath = assetRootPath + 'mapset/png/' + fileName.split('.')[0].toUpperCase() + '.png'
      } else if (fileName.includes('.tsj')) {
        returnPath = assetRootPath + 'mapset/tsj/' + fileName
      } else {
        // error
      }
      return returnPath
    }
  }
}
