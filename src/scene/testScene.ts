import { GridEngine, Direction, NumberOfDirections } from '../grid/GridEngine'
import Phaser from 'phaser'
import { assetBaseUrl } from '../const'
import { touch } from '../input/touch'
import cameraUtil from '../camera/camera'
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js'
import Pinch from 'phaser3-rex-plugins/plugins/input/gestures/pinch/Pinch'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
import { FsbKey, input } from '../input/input'
import { keyboard, Keys } from '../input/keyboard'
import mouse from '../input/mouse'
import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox'
import { createTextBox } from '../ui/dialogBox'
import timer from '../global/timer'
import { Vector2 } from '../grid/Utils/Vector2/Vector2'
import { LayerPosition } from '../grid/Pathfinding/ShortestPathAlgorithm'

export default class TestScene extends Phaser.Scene {
  rexUI: RexUIPlugin // Declare scene property 'rexUI' as RexUIPlugin type
  map:Phaser.Tilemaps.Tilemap
  playerContainer:Phaser.GameObjects.Container
  playerSprite:Phaser.GameObjects.Sprite
  playerSprite2:Phaser.GameObjects.Sprite
  npcContainer:Phaser.GameObjects.Container
  npcSprite:Phaser.GameObjects.Sprite
  npcSprite2:Phaser.GameObjects.Sprite
  npcSprite3:Phaser.GameObjects.Sprite
  rexGestures: GesturesPlugin
  gridEngine: GridEngine
  dir: Direction
  textBox: Phaser.GameObjects.Container
  dlgBox: RexUIPlugin.TextBox

  constructor () {
    super('test')
  }

  preload () {
  }

  create () {
    this.sound.play('vill2', {loop:true})
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
    const tilesetZ0P = this.map.addTilesetImage('tfi0___p', 'tfi0___p', 64, 48, 1, 2)
    const tilesetZ0S = this.map.addTilesetImage('tfi0___s', 'tfi0___s', 64, 48, 1, 2, 1001)

    const moveTileset = this.map.addTilesetImage('moveTileset', 'moveTileset', 64, 48, 0, 0, 2001)

    this.map.createLayer('Z0 P Layer', tilesetZ0P).setDepth(1)
    this.map.createLayer('Z0 S Layer', [tilesetZ0P, tilesetZ0S]).setDepth(2)
    
    this.map.createLayer('Z1 P Layer', tilesetZ0S).setDepth(3)
    this.map.createLayer('Z1 S Layer', [tilesetZ0S, tilesetZ0S]).setDepth(10)

    this.map.createLayer('Z0 Move', moveTileset).setVisible(false)
    this.map.createLayer('Z1 Move', moveTileset).setVisible(false)

    

    this.playerSprite2 = this.add.sprite(0, 0, 'cdit100').setVisible(false)

    this.npcSprite = this.add.sprite(0, 0, 'clmai000')
    this.npcSprite2 = this.add.sprite(0, 0, 'cman200')
    this.npcSprite3 = this.add.sprite(0, 0, 'cman200')

    this.playerSprite = this.add.sprite(0, 0, 'cmiro00')
    this.playerContainer = this.add.container(0, 0).add(this.playerSprite).add(this.playerSprite2)

    this.playerSprite.name = 'player'

    this.npcContainer = this.add.container(0, 0).add(this.npcSprite)

    this.gridEngine.create(this.map, {
      //layerOverlay: true,
      numberOfDirections: NumberOfDirections.FOUR,
      characters: [
        {
          id: 'player',
          sprite: this.playerSprite,
          walkingAnimationMapping: 0,
          startPosition: { x: 22, y: 22 },
          speed: 8,
          offsetX: 0,
          offsetY: -6,
          collides: true,
          container: this.playerContainer,
          charLayer: 'Z1 P Layer'
        },
        {
          id: 'npc',
          sprite: this.npcSprite,
          walkingAnimationMapping: 0,
          startPosition: { x: 12, y: 19 },
          speed: 2,
          offsetX: 0,
          offsetY: 0,
          collides: true,
          container: this.npcContainer,
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
          collides: true,
          charLayer: 'Z0 P Layer'
        }
      ]
    })

    this.gridEngine.addCharacter({
      id: 'npc3',
      sprite: this.npcSprite3,
      walkingAnimationMapping: 0,
      startPosition: { x: 10, y: 19 },
      speed: 4,
      offsetX: 0,
      offsetY: 0,
      collides: true,
      charLayer: 'Z0 P Layer'
    })
    this.gridEngine.moveRandomly('npc', 1000, 4)
    this.gridEngine.moveRandomly('npc2', 1111, 2)
    this.gridEngine.moveRandomly('npc3', 975, 3)

    this.cameras.main.roundPixels = false

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels, true)
    this.cameras.main.startFollow(this.playerContainer, false, 1, 1, -32, -54)
    // this.cameras.main.startFollow(this.playerSprite, false, 1, 1, -32, -54)
    // this.gridEngine.moveTo('npc', { x: 14, y: 20 })


    //this.dlgBox = createTextBox(this, 0, 0, 16 * 8, 8, 5).start('[stroke]대화상자[/stroke] [b][shadow]테스트[/shadow][/b]\n[shadow]다섯손가락마을[/shadow]\n[stroke][b]미로공주[/b][/stroke]', 100)
    this.dlgBox = createTextBox(this, 0, 0, 16 * 8, 10, 4).start('<class="tag0">대화상자 테스트\n다섯손가락마을 \n미로공주</class>', 100)
    //this.dlgBox = createTextBox(this, 0, 0, 16 *12, 12, 5).start('<class="tag0">저도 자세히는 몰라요!\n아무튼\n거대한 알이죠.</class>', 100)

    this.gridEngine.setTransition({x: 22, y: 19},'Z1 P Layer', 'Z0 P Layer')
    this.gridEngine.setTransition({x: 22, y: 19},'Z0 P Layer', 'Z1 P Layer')
    this.gridEngine.setTransition({x: 23, y: 19},'Z0 P Layer', 'Z1 P Layer')
    this.gridEngine.setTransition({x: 23, y: 19},'Z1 P Layer', 'Z0 P Layer')

    this.gridEngine
    .positionChangeFinished()
    .subscribe(({ charId, exitTile, enterTile, enterLayer }) => {
      if(charId != 'player') return
      console.log(enterLayer)
      let player = this.gridEngine.gridCharacters.get('player')
      const dir = player.getFacingDirection()
      let currentMoveLayer = enterLayer.startsWith('Z0') ? 'Z0 Move' : 'Z1 Move'
      
      switch(this.map.getLayer(currentMoveLayer).data[enterTile.y][enterTile.x].index) {
        case 2001 + 0x3D:
          switch (dir) {
            case Direction.UP:
              //console.log(player.getTilePos())
              //player.setTilePosition({ position: new Vector2(enterTile.x, enterTile.y), layer: 'Z0 P Layer' })
              break;

            case Direction.DOWN:
              player.setLayer('Z1 P Layer')
          
              break;
          }
        break;
      }
      
    });
  }


  counter = 0
  update (time: number, delta: number) {
    timer.raf(time, delta);
    //console.log(this.playerContainer.depth)
    //console.log(this.map.getLayer('Z1 S Layer').tilemapLayer.depth)
    this.map.getLayer('Z1 S Layer').tilemapLayer.setDepth(300)
    this.map.getLayer('Z1 S Layer').tilemapLayer.setVisible(true)

    this.dlgBox.setPosition(this.playerContainer.x - 50, this.playerContainer.y)

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

    if (keyboard.wasPressed(Keys.Enter)) {
      //console.log(this.gridEngine.getCharactersAt(this.gridEngine.getFacingPosition('player'), 'Z0 P Layer'))
      //console.log(this.gridEngine.getPosition('player') )
    }
    keyboard.update()
  }

}

export const testScene = new TestScene()
