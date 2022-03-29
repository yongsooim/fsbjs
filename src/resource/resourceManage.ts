import { ImageSource, Sound } from 'excalibur'
import { FsbMapResource } from '../type/fsbTypes'
import { assetRootPath } from '../type/const'

export const resources = {
  IntroImage: new ImageSource(assetRootPath + 'graphics/pcxset/ST00.png'),
  IntroSelector: new ImageSource(assetRootPath + 'graphics/pcxset/ST01.png'),
  Image2: new ImageSource(assetRootPath + 'graphics/ase_ps/CSAM00.png'),
  JahaE: new ImageSource(assetRootPath + 'graphics/ase_fm/EJAHA08.png'),

  /** 다섯손가락 마을 테스트용 */
  Map: new FsbMapResource(assetRootPath + 'mapset/tmj/0022_Tfi0___.tmj'),

  OpeningMap: new FsbMapResource(assetRootPath + 'mapset/tmj/0469_Tcl0___.tmj'),

  /** 푸산 테마, 메인 메뉴 브금 */
  PusanOgg: new Sound(assetRootPath + 'ogg/bgm/pusan.ogg'),

  SonataOgg: new Sound(assetRootPath + 'ogg/bgm/sonata.ogg'),

  /** 마을 BGM (다섯손가락 마을                                                                                   ) */
  vill2: new Sound(assetRootPath + 'ogg/bgm/vill2.ogg'),

  /** 메뉴 항목 선택할 때 나는 소리 */
  e154: new Sound(assetRootPath + 'ogg/wav_eft/e154.ogg'),

  /** 메뉴 커서 옮길 때 나는 소리 */
  e156: new Sound(assetRootPath + 'ogg/wav_eft/e156.ogg'),

  /* 번개 소리, 오프닝에서 쓰임 */
  e112: new Sound(assetRootPath + 'ogg/wav_eft/E112.ogg')

}
