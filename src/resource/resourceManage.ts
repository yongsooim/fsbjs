import { resourceSoundEffect } from './fsbSoundEffect'
import { resourceSoundEvent } from './fsbSoundEvent'
import { resourcePcxSet } from './fsbPcxSet'
import { resourceAseFm } from './fsbAseFm'
import { resourceAsePs } from './fsbAsePs'
import { resourcesMap } from './fsbMap'
import { resourceBgm } from './fsbBgm'

export const resources = {
  ...resourceSoundEffect,
  ...resourceSoundEvent,
  ...resourcePcxSet,
  ...resourceAseFm,
  ...resourceAsePs,
  ...resourcesMap,
  ...resourceBgm
}
