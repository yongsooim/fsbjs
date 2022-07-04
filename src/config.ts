import Phaser from 'phaser'
import { GridEngine } from './grid/GridEngine'
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js'
import * as scene from './scene/scene'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'

export const config : Phaser.Types.Core.GameConfig = {
  // fps: {
  //  target: 60,
  //  forceSetTimeOut: true,
  //  smoothStep: true,
  //  deltaHistory: 600
  // },
  roundPixels: false,
  antialias: true,
  antialiasGL: true,

  type: Phaser.AUTO, // Phaser will decide how to render our game (WebGL or Canvas)
  width: 800,
  height: 600,
  parent: 'game',

  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
      },
      {
        key: 'gridEngine',
        plugin: GridEngine,
        mapping: 'gridEngine'
      },
      {
        key: 'rexGestures',
        plugin: GesturesPlugin,
        mapping: 'rexGestures'
      }
    ]

  },
  banner: false,
  scene: [
    scene.loadingScene,
    scene.testScene,
    scene.menuScene,
    scene.mainScene,
    scene.debugScene
  ]
  // scene: scene.s000_menu,
}
