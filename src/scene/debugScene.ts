import Phaser from 'phaser'
import { keyboard } from '../input/keyboard'

class DebugScene extends Phaser.Scene {
  debugSprite: Phaser.GameObjects.Sprite
  debugText: Phaser.GameObjects.Text

  constructor() {
      super('debug')
  }

  create() {
    //this.debugSprite = this.add.sprite(0, 0, 'cmiro00')
    this.debugText = this.add.text(0, 0, 'Debug Scene', {
      fontFamily: 'Batang',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold',
    })
  }

  update() {
    this.updateLayout() 
  }

  updateLayout() {
    this.debugText.y = this.cameras.main.height - 30

    this.debugText.text = keyboard.getKeys().toString()
    this.debugText.x = this.cameras.main.width / 2 - this.debugText.text.length * 5

  }
}

export const debugScene = new DebugScene()