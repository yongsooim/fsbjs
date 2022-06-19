import { GridEngine } from "./grid/GridEngine"
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
import * as scene from './scene/scene'
import KawaseBlurPostFx from 'phaser3-rex-plugins/plugins/kawaseblurpipeline.js';
import KawaseBlurPipelinePlugin from 'phaser3-rex-plugins/plugins/kawaseblurpipeline-plugin.js';

export const config : Phaser.Types.Core.GameConfig = {
  //fps: {
  //  target: 60,
  //  forceSetTimeOut: true,
  //  smoothStep: true,
  //  deltaHistory: 600
  //},
  roundPixels: false,
  antialias:   false,
  antialiasGL: false,

  type: Phaser.AUTO, //Phaser will decide how to render our game (WebGL or Canvas)
  width: 1440,
  height: 1080,
  plugins: {
    //global: [{
    //  key: 'rexKawaseBlurPipeline',
    //  plugin: KawaseBlurPipelinePlugin,
    //  start: true
    //},
    //],

    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
      {
        key: 'rexGestures',
        plugin: GesturesPlugin,
        mapping: 'rexGestures'
      },
    ],
    
  },
  banner: false,
  scene: scene.s999_testScene,
  //scene: scene.s000_menu,
}
