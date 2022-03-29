import { resourcesSoundEffect } from './fsbSoundEffect'
import { resourcesSoundEvent  } from './fsbSoundEvent'
import { resourcePcxSet       } from './fsbPcxSet'
import { resourceAseFm        } from './fsbAseFm'
import { resourceAsePs        } from './fsbAsePs'
import { resourcesMap         } from './fsbMap'
import { resourcesBgm         } from './fsbBgm'

export const resources = {
  ...resourcesSoundEffect ,
  ...resourcesSoundEvent  ,
  ...resourcePcxSet       ,
  ...resourceAseFm        ,
  ...resourceAsePs        ,
  ...resourcesMap        ,
  ...resourcesBgm
}
