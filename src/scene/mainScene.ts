import { GridEngine, Direction, NumberOfDirections } from '../grid/GridEngine'

import { assetRootPath } from '../const'
import { touch } from '../input/touch'
import cameraUtil from '../camera/camera'
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js'
import Pinch from 'phaser3-rex-plugins/plugins/input/gestures/pinch/Pinch'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
import { FsbKey, input } from '../input/input'
import { keyboard, Keys } from '../input/keyboard'
import mouse from '../input/mouse'

import Phaser from 'phaser'
import { IMainSceneData } from './IMainSceneData'

class MainScene extends Phaser.Scene {
  map:Phaser.Tilemaps.Tilemap
  rexUI: RexUIPlugin // Declare scene property 'rexUI' as RexUIPlugin type
  playerContainer:Phaser.GameObjects.Container
  playerSprite:Phaser.GameObjects.Sprite
  npcSprite:Phaser.GameObjects.Sprite
  rexGestures: GesturesPlugin
  gridEngine: GridEngine

  constructor () {
    super('mainScene')
  }

  create (mainSceneData : IMainSceneData) {
    this.map = this.make.tilemap({ key: mainSceneData.mapKey })
    mainSceneData.tilesets.forEach(tileset => {
      this.map.addTilesetImage(tileset, tileset, 64, 48, 1, 2)
    })
    // const tilesetP = this.map.addTilesetImage("tfi0___p", "tfi0___p", 64, 48, 1, 2)
    // const tilesetS = this.map.addTilesetImage("tfi0___s", "tfi0___s", 64, 48, 1, 2, 1001)

    const pinch = this.rexGestures.add.pinch(this, { enable: true, threshold: 30 })
    pinch.on('pinchstart', () => { if (touch.manager) touch.destroy() })
    pinch.on('pinch', (dragScale: Pinch) => {
      cameraUtil.zoomBy(this, dragScale.scaleFactor)
      cameraUtil.setBoundsAndCenter(this, this.map)
    })
    pinch.on('pinchend', () => { touch.init() })

    this.input.on('wheel', (evt: WheelEvent) => {
      mouse.wheelToZoom(this, evt.deltaY)
      cameraUtil.setBoundsAndCenter(this, this.map)
    })
  }
}

export const mainScene = new MainScene()
