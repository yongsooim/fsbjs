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

export default class TestScene extends Phaser.Scene {
  rexUI: RexUIPlugin // Declare scene property 'rexUI' as RexUIPlugin type
  map:Phaser.Tilemaps.Tilemap
  playerContainer:Phaser.GameObjects.Container
  playerSprite:Phaser.GameObjects.Sprite
  rexGestures: GesturesPlugin
  gridEngine: GridEngine

  constructor () {
    super('test')
  }

  preload () {
  }

  create () {
    this.sound.play('vill2', { loop: true })

    const pinch = this.rexGestures.add.pinch(this, { enable: true, threshold: 30 })

    pinch.on('pinchstart', () => { if (touch.manager) touch.destroy() })
    pinch.on('pinch', (dragScale: Pinch) => {
      cameraUtil.zoomBy(this, dragScale.scaleFactor)
      cameraUtil.setBoundsAndCenter(this, this.map)
    })
    pinch.on('pinchend', touch.init)

    this.input.on('wheel', (evt: WheelEvent) => {
      mouse.wheelToZoom(this, evt.deltaY)
      cameraUtil.setBoundsAndCenter(this, this.map)
    })

    this.map = this.make.tilemap({ key: '0022_tfi0___' })

    // add the tileset image we are using
    const tilesetP = this.map.addTilesetImage('tfi0___p', 'tfi0___p', 64, 48, 1, 2)
    const tilesetS = this.map.addTilesetImage('tfi0___s', 'tfi0___s', 64, 48, 1, 2, 1001)

    this.map.createLayer('Z0 P Layer', tilesetP)
    this.map.createLayer('Z0 S Layer', [tilesetP, tilesetS])
    this.map.createLayer('Z1 P Layer', tilesetP)
    this.map.createLayer('Z1 S Layer', [tilesetP, tilesetS])

    this.playerSprite = this.add.sprite(0, 0, 'cmiro00')
    this.playerSprite.name = 'player'

    this.gridEngine.create(this.map, {
      numberOfDirections: NumberOfDirections.EIGHT,
      characters: [
        {
          id: 'player',
          sprite: this.playerSprite,
          walkingAnimationMapping: 0,
          startPosition: { x: 10, y: 17 },
          speed: 8,
          offsetX: 0,
          offsetY: -6,
          collides: false,
          charLayer: 'Z0 P Layer'
        }
      ]
    })
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels, true)
    this.cameras.main.startFollow(this.playerSprite, false, 1, 1, -32, -54)
  }

  counter = 0
  update () {
    this.gridEngine.move('player', keyboard.lastDirectionHeld())

    if (keyboard.isHeld(Keys.Equal)) {
      cameraUtil.zoomBy(this, 1.02)
      cameraUtil.setBoundsAndCenter(this, this.map)
    } else if (keyboard.isHeld(Keys.Minus)) {
      cameraUtil.zoomBy(this, 0.98)
      cameraUtil.setBoundsAndCenter(this, this.map)
    }
    keyboard.update()
  }
}

export const s999_testScene = new TestScene()
