import { assetRootPath } from '../fsbEngine/type/const'
import { FsbMapResource } from './util/fsbMapResourceClass'
import { ImageSource } from 'excalibur'
import { Sound } from 'excalibur'

class ResourceManager {

  private _fx : Sound[] = []
  private _se : Sound[] = []
  private _pcx : ImageSource[] = []
  private _aseFm : ImageSource[] = []
  private _asePs : ImageSource[] = []
  private _map : FsbMapResource[] = []
  private _bgm : Sound[] = []

  /** sound effect */
  fx(fileName:string) : Sound{
    if(! (fileName in this._fx))
      this._fx[fileName] = new Sound(assetRootPath + 'ogg/wav_eft/' + fileName + '.ogg')
    return this._fx[fileName]
  }

  /** sound event */
  se(fileName:string): Sound{
    if(! (fileName in this._se))
      this._se[fileName] = new Sound(assetRootPath + 'ogg/se_event/' + fileName + '.ogg')
    return this._se[fileName]
  }

  /** images */
  pcx(fileName:string): ImageSource{
    if(! (fileName in this._pcx))
      this._pcx[fileName] = new ImageSource(assetRootPath + 'graphics/pcxset/' + fileName + '.png')
    return this._pcx[fileName]
  } 
  
  /* Variable size sprite sheets */
  aseFm(fileName:string) : ImageSource{
    if(! (fileName in this._aseFm))
      this._aseFm[fileName] = new ImageSource(assetRootPath + 'graphics/aseFm/' + fileName + '.png')
    return this._aseFm[fileName]
  }  
  
  /* Fixed size sprite sheets */
  asePs(fileName:string) : ImageSource{
    if(! (fileName in this._asePs))
      this._asePs[fileName] = new ImageSource(assetRootPath + 'graphics/ase_ps/' + fileName + '.png')
    return this._asePs[fileName]
  }  
  
  /** bgm */
  bgm(fileName:string) : Sound {
    if(! (fileName in this._bgm))
      this._bgm[fileName] = new Sound(assetRootPath + 'ogg/bgm/' + fileName + '.ogg')
    return this._bgm[fileName]
  }
  
  /** map */
  map(fileName:string) : FsbMapResource{
    if(! (fileName in this._map))
      this._map[fileName] = new FsbMapResource(assetRootPath + 'mapset/tmj/' + fileName + '.tmj')
    return this._map[fileName]
  }  
}

export const resource = new ResourceManager()
