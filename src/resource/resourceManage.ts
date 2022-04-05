import { assetRootPath } from '../fsbEngine/type/const'
import { FsbMapResource } from './util/fsbMapResourceClass'
import { ImageSource, Loader, Sound } from 'excalibur'

/**
 * When get function is called, find the object with file name as index in an internal array.
 * 
 * If the object already exists in the array, return it.
 * 
 * If the object is not in the array, construct with path, push to array and return it.
 * */
class ResourceManager {
  private _fx = [] as ImageSource[]
  private _se = [] as Sound[]
  private _pcx = [] as ImageSource[]
  private _aseFm = [] as ImageSource[]
  private _asePs = [] as ImageSource[]
  private _map = [] as FsbMapResource[]
  private _bgm = [] as Sound[]

  /** Get sound effect */
  fx (fileName:string) : Sound {
    if (!(fileName in this._fx)) { 
      this._fx[fileName] = new Sound(assetRootPath + 'ogg/wav_eft/' + fileName + '.ogg') 
    }
    return this._fx[fileName]
  }

  /** Get sound event */
  se (fileName:string): Sound {
    if (!(fileName in this._se)) { 
      this._se[fileName] = new Sound(assetRootPath + 'ogg/se_event/' + fileName + '.ogg') 
    }
    return this._se[fileName]
  }

  /** Get image */
  pcx (fileName:string): ImageSource {
    if (!(fileName in this._pcx)) { 
      this._pcx[fileName] = new ImageSource(assetRootPath + 'graphics/pcxset/' + fileName + '.png') 
    }
    return this._pcx[fileName]
  }

  /** Get variable size sprite sheet */
  fm (fileName:string) : ImageSource {
    if (!(fileName in this._aseFm)) { 
      this._aseFm[fileName] = new ImageSource(assetRootPath + 'graphics/ase_fm/' + fileName + '.png') 
    }    return this._aseFm[fileName]
  }

  /** Get fixed size sprite sheet */
  ps (fileName:string) : ImageSource {
    if (!(fileName in this._asePs)) { 
      this._asePs[fileName] = new ImageSource(assetRootPath + 'graphics/ase_ps/' + fileName + '.png') 
    }
    return this._asePs[fileName]
  }

  /** Get bgm */
  bgm (fileName:string) : Sound {
    if (!(fileName in this._bgm)) { 
      this._bgm[fileName] = new Sound(assetRootPath + 'ogg/bgm/' + fileName + '.ogg') 
    }
    return this._bgm[fileName]
  }

  /** Get map resource */
  map (fileName:string) : FsbMapResource {
    if (!(fileName in this._map)) { 
      this._map[fileName] = new FsbMapResource(assetRootPath + 'mapset/tmj/' + fileName + '.tmj') 
    }
    return this._map[fileName]
  }

  async load(resources : (Sound|ImageSource|FsbMapResource)[]){
    let localLoader = [] as (Sound|ImageSource|FsbMapResource)[]
    resources.forEach(resource => {
      if(!resource.isLoaded()) localLoader.push(resource)
    })
    return Promise.all(localLoader.map(v=>v.load())) 
  }  
}

/** Global singleton resource manager */
export const resource = new ResourceManager()
