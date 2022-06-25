import Phaser from "phaser";

import { keyboard } from "./keyboard";
import { touch } from "./touch";

export enum FsbKey {
  Up = 'Up',
  Left = 'Left',
  Down = 'Down',
  Right = 'Right',
  C = 'C',
  Shift = 'Shift',
  Esc = 'Esc',
  Enter = 'Enter',
  None = 'None'
}

class Input {
  update(scene: Phaser.Scene) {
   
  }

  wasPressed(key: FsbKey) {
    return false
  }

  isHeld(key: FsbKey) {
    return false
  }
  
}

export const input = new Input()