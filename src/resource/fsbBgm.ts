import { Sound } from 'excalibur'
import { assetRootPath } from '../type/const'

export let resourcesBgm = {
  /** 푸산 테마, 메인 메뉴 브금 */
  PusanOgg: new Sound(assetRootPath + 'ogg/bgm/pusan.ogg'),

  SonataOgg: new Sound(assetRootPath + 'ogg/bgm/sonata.ogg'),

  /** 마을 BGM (다섯손가락 마을                                                                                   ) */
  vill2: new Sound(assetRootPath + 'ogg/bgm/vill2.ogg'),

}