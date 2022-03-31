import { Sound } from 'excalibur'
import { assetRootPath } from '../fsbEngine/type/const'

const categoryPath = 'ogg/se_event/' 
export const soundEvent = {
  ask: new Sound(assetRootPath + categoryPath + 'ask.ogg')
}
