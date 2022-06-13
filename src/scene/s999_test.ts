import Phaser from "phaser"
import { assetRootPath } from "../const"

export default class TestScene extends Phaser.Scene {
  constructor() {
    super("test")
  }
  preload() {
    // load the PNG file
    this.load.image("csam0", assetRootPath + "graphics/ase_ps/csam00.png")
    this.load.image("tfi0___p", assetRootPath + "mapset/png/tfi0___p.png")
    this.load.image("tfi0___s", assetRootPath + "mapset/png/tfi0___s.png")
    this.load.image("csam0", assetRootPath + "graphics/ase_ps/csam00.png")

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

    
    let playerSprite = new Phaser.GameObjects.Sprite(this, 100, 100, "csam0")

    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          walkingAnimationMapping: 6,
        },
      ],
    };

    //this.gridEngine.create(tilemap, gridEngineConfig);
  
  }

  update() {


  }
}

export const s999_testScene = new TestScene()
