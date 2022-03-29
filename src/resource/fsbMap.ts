import { assetRootPath } from '../type/const'
import { FsbMapResource } from './util/fsbMapResourceClass'

export let resourcesMap = {
  /** 다섯손가락 마을 테스트용 */
  Map: new FsbMapResource(assetRootPath + 'mapset/tmj/0022_Tfi0___.tmj'),

}