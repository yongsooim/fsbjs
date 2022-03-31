import { Sound } from 'excalibur'
import { assetRootPath } from '../fsbEngine/type/const'

export const bgm = {
  /** 푸산 테마, 메인 메뉴 브금 */
  pusan: new Sound(assetRootPath + 'ogg/bgm/pusan.ogg'),

  /** 소나타 테마, 오프닝 첫 장면,  */
  sonata: new Sound(assetRootPath + 'ogg/bgm/sonata.ogg'),

  /** 마을 BGM (다섯손가락 마을) */
  vill2: new Sound(assetRootPath + 'ogg/bgm/vill2.ogg'),
  

}
