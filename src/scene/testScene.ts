import { GridEngine, Direction, NumberOfDirections } from '../grid/GridEngine'
import Phaser from 'phaser'
import { assetRootPath } from '../const'
import { touch } from '../input/touch'
import cameraUtil from '../camera/camera'
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js'
import Pinch from 'phaser3-rex-plugins/plugins/input/gestures/pinch/Pinch'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
import { FsbKey, input } from '../input/input'
import { keyboard, Keys } from '../input/keyboard'
import mouse from '../input/mouse'
import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox'
import { createDlgBox } from '../ui/dialogBox'

export default class TestScene extends Phaser.Scene {
  rexUI: RexUIPlugin // Declare scene property 'rexUI' as RexUIPlugin type
  map:Phaser.Tilemaps.Tilemap
  playerContainer:Phaser.GameObjects.Container
  playerSprite:Phaser.GameObjects.Sprite
  playerSprite2:Phaser.GameObjects.Sprite
  npcSprite:Phaser.GameObjects.Sprite
  npcSprite2:Phaser.GameObjects.Sprite
  npcSprite3:Phaser.GameObjects.Sprite
  rexGestures: GesturesPlugin
  gridEngine: GridEngine
  dir: Direction
  textBox: Phaser.GameObjects.Container

  constructor () {
    super('test')
  }

  preload () {
  }

  create () {
    const pinch = this.rexGestures.add.pinch(this, { enable: true, threshold: 30 })

    pinch.on('pinchstart', () => { touch.reset() })
    pinch.on('pinch', (dragScale: Pinch) => {
      cameraUtil.zoomBy(this, dragScale.scaleFactor)
      cameraUtil.setBoundsAndCenter(this, this.map)
    })
    pinch.on('pinchend', () => { touch.init() })

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

    // this.map.createLayer(1, tilesetP)
    // this.map.createLayer(2, [tilesetP, tilesetS])
    // this.map.createLayer(3, tilesetP)
    // this.map.createLayer(4, [tilesetP, tilesetS])

    this.playerSprite = this.add.sprite(0, 0, 'cmiro00')
    this.playerSprite2 = this.add.sprite(0, 0, 'cdit100')
    this.playerSprite2.visible = false
    this.playerContainer = this.add.container(0, 0)
    this.playerContainer.add(this.playerSprite)
    this.playerContainer.add(this.playerSprite2)

    this.npcSprite = this.add.sprite(0, 0, 'clmai000')
    this.npcSprite2 = this.add.sprite(0, 0, 'cman200')
    this.npcSprite3 = this.add.sprite(0, 0, 'cman200')
    this.playerSprite.name = 'player'

    this.gridEngine.create(this.map, {
      numberOfDirections: NumberOfDirections.FOUR,
      characters: [
        {
          id: 'player',
          sprite: this.playerSprite,
          walkingAnimationMapping: 0,
          startPosition: { x: 10, y: 19 },
          speed: 8,
          offsetX: 0,
          offsetY: -6,
          collides: false,
          container: this.playerContainer,
          charLayer: 'Z0 P Layer'
        },
        {
          id: 'npc',
          sprite: this.npcSprite,
          walkingAnimationMapping: 0,
          startPosition: { x: 12, y: 19 },
          speed: 2,
          offsetX: 0,
          offsetY: 0,
          collides: false,
          charLayer: 'Z0 P Layer'
        },
        {
          id: 'npc2',
          sprite: this.npcSprite2,
          walkingAnimationMapping: 0,
          startPosition: { x: 10, y: 17 },
          speed: 4,
          offsetX: 0,
          offsetY: 0,
          collides: false,
          charLayer: 'Z0 P Layer'
        }
      ]
    })

    this.gridEngine.addCharacter({
      id: 'npc3',
      sprite: this.npcSprite3,
      walkingAnimationMapping: 0,
      startPosition: { x: 10, y: 17 },
      speed: 4,
      offsetX: 0,
      offsetY: 0,
      collides: false,
      charLayer: 'Z0 P Layer'
    })
    this.gridEngine.moveRandomly('npc', 1000, 4)
    this.gridEngine.moveRandomly('npc2', 1111, 2)
    this.gridEngine.moveRandomly('npc3', 975, 3)

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels, true)
    this.cameras.main.startFollow(this.playerContainer, false, 1, 1, -32, -54)
    // this.cameras.main.startFollow(this.playerSprite, false, 1, 1, -32, -54)
    // this.gridEngine.moveTo('npc', { x: 14, y: 20 })

    //this.playerContainer.add(this.textBox)
    this.textBox = createDlgBox(this)

    
    //this.playerContainer.add(this.textBox)

  }

  counter = 0
  update () {
    this.textBox.x = this.playerContainer.x
    this.textBox.y = this.playerContainer.y - 30
    this.dir = keyboard.lastDirectionHeld()
    if (this.dir != Direction.NONE) {
      if (keyboard.isHeld(Keys.ShiftLeft)) {
        this.gridEngine.setSpeed('player', 16)
      } else {
        this.gridEngine.setSpeed('player', 8)
      }  
      this.gridEngine.move('player', this.dir)
    }


    if (keyboard.wasPressed(Keys.Enter)) {
      const text = this.add.text(0, 0, '확인', {
        fontFamily: 'Batang',
        fontSize: '15px',
        color: '#ffffff'
      })
      this.playerContainer.add(text)
      setTimeout(() => {
        text.destroy()
      }, 1000)
    }

    if (keyboard.wasPressed(Keys.Escape)) {
      const text = this.add.text(30, 0, '취소', {
        fontFamily: 'Batang',
        fontSize: '15px',
        color: '#ffffff'
      })
      this.playerContainer.add(text)
      setTimeout(() => {
        text.destroy()
      }, 1000)
    }

    if (keyboard.wasPressed(Keys.KeyC)) {
      // this.playerSprite = new Phaser.GameObjects.Sprite(this, 0, 0, 'cdit100')
      // this.playerSprite = this.add.sprite(0, 0, 'cmiro00')
      if (this.playerSprite2.visible) {
        this.gridEngine.setSprite('player', this.playerSprite)
        this.playerSprite.visible = true
        this.playerSprite2.visible = false
      } else {
        this.gridEngine.setSprite('player', this.playerSprite2)
        this.playerSprite.visible = false
        this.playerSprite2.visible = true
      }
    }

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

export const testScene = new TestScene()
