import  {GridEngine, Direction, NumberOfDirections} from "../grid/GridEngine"

import { assetRootPath } from "../const"
import { touch } from "../input/touch"
import cameraUtil from '../camera/camera'
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
import Pinch from "phaser3-rex-plugins/plugins/input/gestures/pinch/Pinch"
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import KawaseBlurPipelinePlugin from 'phaser3-rex-plugins/plugins/kawaseblurpipeline-plugin.js';
import { FsbKey, input } from "../input/input"
import {keyboard, Keys} from '../input/keyboard'
import mouse from "../input/mouse"

export default class TestScene extends Phaser.Scene {
  rexUI: RexUIPlugin;  // Declare scene property 'rexUI' as RexUIPlugin type

  constructor() {
    super("test")
  }
  preload() {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: RexUIPlugin,
      sceneKey: 'rexUI'
    });
    // load the PNG file
    this.load.image("tfi0___p", assetRootPath + "mapset/png_ext/tfi0___p.png")
    this.load.image("tfi0___s", assetRootPath + "mapset/png_ext/tfi0___s.png")

    this.load.spritesheet("player", assetRootPath + "graphics/ase_ps/cmiro00.png", {
      frameWidth: 64,
      frameHeight: 96,
    });
  
    // load the JSON file
    this.load.tilemapTiledJSON(
      "tilemap",
      assetRootPath + "mapset/tmj/0022_tfi0___.tmj"
    )
    this.load.json('moveProp', assetRootPath + "mapset/json/0022_tfi0___.json");
  }

  map:Phaser.Tilemaps.Tilemap
  playerContainer:Phaser.GameObjects.Container
  playerSprite:Phaser.GameObjects.Sprite
  rexGestures: GesturesPlugin
  gridEngine: GridEngine

  create() {
    //let pipelineInstance = this.plugins.get('rexKawaseBlurPipeline') as KawaseBlurPipelinePlugin
    //pipelineInstance.add(this.cameras.main, {
    //  blur: 1, 
    //  quality: 1
    //});

    keyboard.init()

    let pinch = this.rexGestures.add.pinch(this, {enable: true, threshold: 30});
    
    pinch.on('pinchstart', () => { if(touch.manager) touch.destroy() })
    pinch.on('pinch', (dragScale: Pinch) => { this.cameras.main.zoom *= dragScale.scaleFactor })
    pinch.on('pinchend', () => { touch.init()})


    this.map = this.make.tilemap({ key: "tilemap" })
    
    // add the tileset image we are using
    //const tilesetP = this.map.addTilesetImage("tfi0___p", "tfi0___p", 64, 48, 1, 2)
    //const tilesetS = this.map.addTilesetImage("tfi0___s", "tfi0___s", 64, 48, 1, 2)
    const tilesetP = this.map.addTilesetImage("tfi0___p", "tfi0___p", 64, 48, 1, 2)
    const tilesetS = this.map.addTilesetImage("tfi0___s", "tfi0___s", 64, 48, 1, 2, 1001)

    this.map.createLayer("Z0 P Layer", tilesetP)
    this.map.createLayer("Z0 S Layer", [tilesetP, tilesetS])
    this.map.createLayer("Z1 P Layer", tilesetP)
    this.map.createLayer("Z1 S Layer", [tilesetP, tilesetS])

    this.playerSprite = this.add.sprite(0, 0, "player");
    this.playerSprite.name = "player"
    
    this.gridEngine.create(this.map, {
      numberOfDirections: NumberOfDirections.EIGHT,
      characters: [
        {
          id: "player",
          sprite: this.playerSprite,
          walkingAnimationMapping: 0,
          startPosition: { x: 10, y: 17 },
          speed: 8,
          offsetX: 0,
          offsetY: -6,
          collides: false,
          charLayer: "Z0 P Layer",
        },
        ],
    });

    this.input.on("wheel",  (evt: WheelEvent) => {
      mouse.wheelToZoom(this, evt.deltaY) 
      cameraUtil.setBoundsAndCenter(this, this.map)
    });
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels, true)
    this.cameras.main.startFollow(this.playerSprite, false, 1, 1, -32, -54)

  }
  
  counter = 0
  update() {
    //cameraUtil.followUpdate(this, this.map, this.playerSprite)

    const cursors = this.input.keyboard.createCursorKeys();
    if(keyboard.isHeld(Keys.A) || cursors.left.isDown || touch.isPressed === FsbKey.Left) {
      this.gridEngine.move("player", Direction.LEFT);
    } else if (keyboard.isHeld(Keys.D)  || cursors.right.isDown || touch.isPressed === FsbKey.Right) {
      this.gridEngine.move("player", Direction.RIGHT);
    } else if (keyboard.isHeld(Keys.W)  || cursors.up.isDown || touch.isPressed === FsbKey.Up) {
      this.gridEngine.move("player", Direction.UP);
    } else if (keyboard.isHeld(Keys.S)  || cursors.down.isDown || touch.isPressed === FsbKey.Down) {
      this.gridEngine.move("player", Direction.DOWN);
    }

    keyboard.update()

  }

}

/** 테스트 */
export const s999_testScene = new TestScene()
