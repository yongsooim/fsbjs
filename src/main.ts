import Phaser from "phaser"
import {GridEngine} from "./grid/GridEngine"
//import {GridEngine} from "grid-engine"
//import {GridEngine} from "fsb-grid"
import { assetRootPath } from "./const"
import { s999_testScene } from "./scene/s999_test"
import { s000_menu } from "./scene/s000_menu"
import KawaseBlurPostFx from 'phaser3-rex-plugins/plugins/kawaseblurpipeline.js';

// create the game, and pass it the configuration
export const game = new Phaser.Game({
  //fps: {
  //  target: 60,
  //  forceSetTimeOut: true,
  //  smoothStep: true,
  //  deltaHistory: 600
  //},

  pixelArt:    false,
  roundPixels: true,
  antialias:   false,
  antialiasGL: false,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },

  type: Phaser.AUTO, //Phaser will decide how to render our game (WebGL or Canvas)
  //width: 1920,
  //height: 1080,
  //width: 0,
  //height: 0,
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ]
  },
  banner: false,
  scene: s999_testScene,
  //scene: s000_menu,
})

function fitAndFill(){
  const screenRatio = window.innerWidth / window.innerHeight
  const guaranteedRatio = 1920 /1080
  if(screenRatio === guaranteedRatio) {
    game.scale.setGameSize(1920, 1080)
  } else if(screenRatio > 16/9){
    game.scale.setGameSize(1080 * screenRatio , 1080)
  } else {
    game.scale.setGameSize(1920, 1920 / screenRatio )
  }
}


fitAndFill()

window.addEventListener("resize", fitAndFill)
window.addEventListener("change", fitAndFill)
window.addEventListener("orientationchange", fitAndFill)
screen.orientation.addEventListener('change', fitAndFill)
