import Phaser from 'phaser'
import { keyboard } from '../input/keyboard'

class DebugScene extends Phaser.Scene {
  debugSprite: Phaser.GameObjects.Sprite
  debugText: Phaser.GameObjects.Text
  background: Phaser.GameObjects.Graphics

  constructor () {
    super('debug')
  }

  create () {
    // this.debugSprite = this.add.sprite(0, 0, 'cmiro00')
    this.debugText = this.add.text(0, 0, 'Debug Scene', {
      fontFamily: 'Batang',
      fontSize: '15px',
      color: '#ffffff',
      fontStyle: 'bold'
    })

    this.background = this.add.graphics({
      fillStyle: {
        color: 0x000000
      }
    })
  }

  update () {
    this.updateLayout()
  }

  updateLayout () {

    this.debugText.y = this.cameras.main.height - 30

    this.debugText.text = keyboard.history.toString()
    this.debugText.x = this.cameras.main.width / 2 - this.debugText.text.length * 5
  }
}

export const debugScene = new DebugScene()
