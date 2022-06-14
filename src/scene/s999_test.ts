import Phaser from "phaser"
import {GridEngine, Direction} from "fsb-grid"
//import {GridEngine, Direction} from "grid-engine"
import { assetRootPath } from "../const"

export default class TestScene extends Phaser.Scene {
  constructor() {
    super("test")
  }
  preload() {
    // load the PNG file
    this.load.image("tfi0___p", assetRootPath + "mapset/png/tfi0___p.png")
    this.load.image("tfi0___s", assetRootPath + "mapset/png/tfi0___s.png")

    this.load.spritesheet("player", assetRootPath + "graphics/ase_ps/csam00.png", {
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

    const playerSprite = this.add.sprite(640, 640, "player");
    playerSprite.name = "player"
    this.cameras.main.startFollow(playerSprite, true);
    this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);
  

    console.log(map)
    console.log(this.gridEngine)
    this.gridEngine.create(map, {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          //walkingAnimationMapping: 0,
          startPosition: { x: 8, y: 8 },
        },
        ],
    });
  }
  gridEngine: GridEngine

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.gridEngine.move("player", Direction.LEFT);
    } else if (cursors.right.isDown) {
      this.gridEngine.move("player", Direction.RIGHT);
    } else if (cursors.up.isDown) {
      this.gridEngine.move("player", Direction.UP);
    } else if (cursors.down.isDown) {
      this.gridEngine.move("player", Direction.DOWN);
    }
    console.log(this.gridEngine.isMoving('player'))
  }

}

export const s999_testScene = new TestScene()
