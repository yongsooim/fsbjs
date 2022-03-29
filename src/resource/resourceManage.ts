import { soundEffect } from './fsbSoundEffect'
import { soundEvent } from './fsbSoundEvent'
import { pcxSet } from './fsbPcxSet'
import { aseFm } from './fsbAseFm'
import { asePs } from './fsbAsePs'
import { map } from './fsbMap'
import { bgm } from './fsbBgm'

import { ImageSource } from 'excalibur'
import { Sound } from 'excalibur'
import { assetRootPath } from '../fsbEngine/type/const'
import { FsbMapResource } from './util/fsbMapResourceClass'

export const resources = {
  /** soundEffect ************************************************************************
  /** 메뉴 항목 선택할 때 나는 소리 */
  e154: new Sound(assetRootPath + 'ogg/wav_eft/e154.ogg'),

  /** 메뉴 커서 옮길 때 나는 소리 */
  e156: new Sound(assetRootPath + 'ogg/wav_eft/e156.ogg'),

  /** 번개 소리, 오프닝에서 쓰임 */
  e112: new Sound(assetRootPath + 'ogg/wav_eft/e112.ogg'),


  // soundEvent ************************************************************************
  ask: new Sound(assetRootPath + 'ogg/se_event/ask.ogg'),

  //pcxSet ************************************************************************
  /** intro image */
  st00: new ImageSource(assetRootPath + 'graphics/pcxset/st00.png'),
  /** intro selector */
  st01: new ImageSource(assetRootPath + 'graphics/pcxset/st01.png'),


  /** 가변 크기 스프라이트 시트 */
  //aseFm ************************************************************************
  /** 빙룡승천 */
  ejaha08: new ImageSource(assetRootPath + 'graphics/ase_fm/ejaha08.png'),


  /** 고정 크기 스프라이트 시트 */
  //asePs ************************************************************************
  /** 삼장 걷기 */
  csam00: new ImageSource(assetRootPath + 'graphics/ase_ps/csam00.png'),

//  map ************************************************************************
  /** 다섯손가락 마을 */
  m0022_tfi0: new FsbMapResource(assetRootPath + 'mapset/tmj/0022_tfi0___.tmj'),
  /** 오프닝 씬 맵  */
  m0469_tcl0: new FsbMapResource(assetRootPath + 'mapset/tmj/0469_tcl0___.tmj'),
  
  //bgm ************************************************************************
  /** 푸산 테마, 메인 메뉴 브금 */
  pusan: new Sound(assetRootPath + 'ogg/bgm/pusan.ogg'),

  /** 소나타 테마, 오프닝 첫 장면,  */
  sonata: new Sound(assetRootPath + 'ogg/bgm/sonata.ogg'),

  /** 마을 BGM (다섯손가락 마을) */
  vill2: new Sound(assetRootPath + 'ogg/bgm/vill2.ogg'),

  
}
