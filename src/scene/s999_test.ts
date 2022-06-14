import  {GridEngine, Direction} from "../grid/GridEngine"
import {wheelToZoom} from "../input/mouse"

import { assetRootPath } from "../const"
import nipplejs from 'nipplejs';


let manager = nipplejs.create({
  mode: 'dynamic',
  size: 70,
  fadeTime: 0
})

let isPressed = ''

manager.on('move', (evt, data)=> {
  if(data.direction) {
    isPressed = data.direction.angle as string
  } else {
    isPressed = ''
  }
})

manager.on('end', (evt, data)=> {
  isPressed = ''
})

export default class TestScene extends Phaser.Scene {
  constructor() {
    super("test")
  }
  preload() {
    this.load.plugin('rexkawaseblurpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexkawaseblurpipelineplugin.min.js', true);

    // load the PNG file
    this.load.image("tfi0___p", assetRootPath + "mapset/png/tfi0___p.png")
    this.load.image("tfi0___s", assetRootPath + "mapset/png/tfi0___s.png")

    this.load.spritesheet("player", assetRootPath + "graphics/ase_ps/cmiro00.png", {
      frameWidth: 64,
      frameHeight: 96,
    });
  
    // load the JSON file
    this.load.tilemapTiledJSON(
      "tilemap",
      assetRootPath + "mapset/tmj/0022_tfi0___.tmj"
    )
  }

  create() {

    const map = this.make.tilemap({ key: "tilemap" })

    // add the tileset image we are using
    const tilesetP = map.addTilesetImage("tfi0___p", "tfi0___p")
    const tilesetS = map.addTilesetImage("tfi0___s", "tfi0___s")

    map.createLayer("Z0 P Layer", tilesetP)
    map.createLayer("Z0 S Layer", tilesetS)
    map.createLayer("Z1 P Layer", tilesetP)
    map.createLayer("Z1 S Layer", tilesetS)

    const playerSprite = this.add.sprite(0, 0, "player");
    playerSprite.name = "player"
    this.cameras.main.startFollow(playerSprite, false);
    //this.cameras.main.setFollowOffset(playerSprite.width / 2, -playerSprite.height);
    this.cameras.main.setFollowOffset(- playerSprite.width / 2, -playerSprite.height / 2);

  
    this.gridEngine.create(map, {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          walkingAnimationMapping: 0,
          startPosition: { x: 10, y: 17 },
          speed: 8,
          offsetX: 0,
          offsetY: -6
        },
        ],
    });
    this.cameras.main.zoom = 2



    this.input.on("wheel",  evt => {
      wheelToZoom(this, evt.deltaY)
  });

  }
  gridEngine: GridEngine

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown || isPressed === 'left') {
      this.gridEngine.move("player", Direction.LEFT);
    } else if (cursors.right.isDown || isPressed === 'right') {
      this.gridEngine.move("player", Direction.RIGHT);
    } else if (cursors.up.isDown || isPressed === 'up') {
      this.gridEngine.move("player", Direction.UP);
    } else if (cursors.down.isDown || isPressed === 'down') {
      this.gridEngine.move("player", Direction.DOWN);
    }
  }

}

/** 테스트 */
export const s999_testScene = new TestScene()
