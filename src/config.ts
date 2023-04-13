import Phaser from 'phaser'
import { GridEngine } from './grid/GridEngine'
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js'
import * as scene from './scene/scene'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
import NinePatch2Plugin from 'phaser3-rex-plugins/plugins/ninepatch2-plugin.js';
import TagTextPlugin from 'phaser3-rex-plugins/plugins/tagtext-plugin.js';
import { screenConst } from './const'

export const config: Phaser.Types.Core.GameConfig = {
  fps: {
    target: 60,
    //  forceSetTimeOut: true,
    smoothStep: true,
    //  deltaHistory: 600
  },
  roundPixels: true,
  antialias: true,
  antialiasGL: true,
  powerPreference: 'high-performance',
  autoFocus: true,

  type: Phaser.WEBGL, // Phaser will decide how to render our game (WebGL or Canvas)
  width: screenConst.width,
  height: screenConst.height,
  parent: 'game',


  banner: false,
  scene: [
    scene.loadingScene,
    scene.testScene,
    scene.menuScene,
    scene.mainScene,
    scene.debugScene
  ],
  plugins: {
    global: [
      {
        key: 'rexNinePatch2Plugin',
        plugin: NinePatch2Plugin,
        start: true
      },
      {
        key: 'rexTagTextPlugin',
        plugin: TagTextPlugin,
        start: true
      }],
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
}
