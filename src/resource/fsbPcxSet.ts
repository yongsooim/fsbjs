import { ImageSource } from 'excalibur'
import { assetRootPath } from '../fsbEngine/type/const'

/** shorthand for constructor */
const con = (fileName:string) => { return new ImageSource(assetRootPath + 'graphics/pcxset/' + fileName + '.png')  }
export const pcxSet = {
  /** intro image */
  st00: con('st00'),
  /** intro selector */
  st01: con('st01')
}
