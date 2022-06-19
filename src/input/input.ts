import Phaser from "phaser";

export enum FsbKey {
  UP = 'up', // 
  LEFT = 'left',
  DOWN = 'down',
  RIGHT = 'right',
  C = 'c',
  SHIFT = 'shift',
  ESC = 'esc',
  ENTER = 'enter',
}

class Input {
  update(scene: Phaser.Scene) {
    const keys = scene.input.keyboard.
    console.log(keys)
  }
}

export const input = new Input()