import Phaser from "phaser"
//import {GridEngine} from "./grid/main-esm"
//import {GridEngine} from "grid-engine"
import {GridEngine} from "fsb-grid"
import { assetRootPath } from "./const"
import { s999_testScene } from "./scene/s999_test"
import { s000_menu } from "./scene/s000_menu"

// create the game, and pass it the configuration
export const game = new Phaser.Game({
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  type: Phaser.AUTO, //Phaser will decide how to render our game (WebGL or Canvas)
  width: 1920,
  height: 1080,
  antialias:false,
  antialiasGL:false,
  //width: 0,
  //height: 0,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },
  banner: false,
  scene: s999_testScene,
  //scene: s000_menu,
})
game.scale.setParentSize(window.innerWidth, window.innerHeight)

window.addEventListener("resize", () => {
  //game.scale.setParentSize(window.innerWidth, window.innerHeight)
})
