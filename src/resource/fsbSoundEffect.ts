import { Sound } from 'excalibur'
import { assetRootPath } from '../fsbEngine/type/const'

const categoryPath = 'ogg/wav_eft/' 
export const soundEffect = {
  /** 메뉴 항목 선택할 때 나는 소리 */
  e154: new Sound(assetRootPath + categoryPath + 'e154.ogg'),

  /** 메뉴 커서 옮길 때 나는 소리 */
  e156: new Sound(assetRootPath + categoryPath +  'e156.ogg'),

  /* 번개 소리, 오프닝에서 쓰임 */
  e112: new Sound(assetRootPath + categoryPath +  'e112.ogg')

}
