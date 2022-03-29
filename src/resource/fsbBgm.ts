import { Sound } from 'excalibur'
import { assetRootPath } from '../type/const'

export const resourceBgm = {
  /** 푸산 테마, 메인 메뉴 브금 */
  bmgPusan: new Sound(assetRootPath + 'ogg/bgm/pusan.ogg'),

  bgmSonata: new Sound(assetRootPath + 'ogg/bgm/sonata.ogg'),

  /** 마을 BGM (다섯손가락 마을                                                                                   ) */
  bgmVill2: new Sound(assetRootPath + 'ogg/bgm/vill2.ogg')

}
