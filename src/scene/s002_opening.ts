import Phaser from 'phaser'
import { assetRootPath } from '../const'
import { game } from '../main'
import st01 from './st01.json'

enum Button {
  LOAD = 0,
  START = 1,
  EXIT = 2,
}

class OpeningScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image
  selected = Button.LOAD as number

  constructor () {
    super({
      key: 'menu'
    })
  }

  preload () {
    this.load.audio('pusan', [
      assetRootPath + 'ogg/bgm/pusan.ogg',
      assetRootPath + 'mp3/bgm/pusan.mp3'
    ])
    this.load.image('background', assetRootPath + 'graphics/pcxset/st00.png')
    this.load.aseprite('st01', assetRootPath + 'graphics/pcxset/st01.png', st01)
  }

  loadSprite: Phaser.GameObjects.Sprite
  startSprite: Phaser.GameObjects.Sprite
  exitSprite: Phaser.GameObjects.Sprite

  create () {
    this.background = this.add.image(0, 0, 'background')
    this.background.scale = 2
    this.background.x = this.cameras.main.width / 2
    this.background.y = this.cameras.main.height / 2

    this.anims.create({
      key: 'load',
      frameRate: 12,
      frames: this.anims.generateFrameNames('st01', {
        prefix: 'load',
        start: 0,
        end: 2
      }),
      repeat: -1
    })

    this.anims.create({
      key: 'exit',
      frameRate: 12,
      frames: this.anims.generateFrameNames('st01', {
        prefix: 'exit',
        start: 0,
        end: 2
      }),
      repeat: -1
    })

    this.anims.create({
      key: 'start',
      frameRate: 12,
      frames: this.anims.generateFrameNames('st01', {
        prefix: 'start',
        start: 0,
        end: 2
      }),
      repeat: -1
    })

    const offsetX = 850
    const offsetY = 500

    this.loadSprite = this.add.sprite(1200, 690, 'load')
    this.loadSprite.scale = 2
    this.loadSprite.play('load')
    this.loadSprite.setVisible(false)

    this.startSprite = this.add.sprite(1175, 790, 'start')
    this.startSprite.scale = 2
    this.startSprite.play('start')
    this.startSprite.setVisible(false)

    this.exitSprite = this.add.sprite(1220, 875, 'exit')
    this.exitSprite.scale = 2
    this.exitSprite.play('exit')
    this.exitSprite.setVisible(false)

    // this.sound.play("pusan", { loop: true })
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
  }

  up: Phaser.Input.Keyboard.Key
  down: Phaser.Input.Keyboard.Key
  enter:Phaser.Input.Keyboard.Key

  update () {
    if (Phaser.Input.Keyboard.JustDown(this.up)) {
      this.selected--
    } else if (Phaser.Input.Keyboard.JustDown(this.down)) {
      this.selected++
    }

    if (this.selected < 0) {
      this.selected = 2
    } else if (this.selected > 2) {
      this.selected = 0
    }

    if (this.selected == Button.LOAD) {
      this.loadSprite.setVisible(true)
      // this.loadSprite.play("load")
      this.startSprite.setVisible(false)
      this.exitSprite.setVisible(false)
    } else if (this.selected == Button.START) {
      this.loadSprite.setVisible(false)
      this.startSprite.setVisible(true)
      this.exitSprite.setVisible(false)
    } else if (this.selected == Button.EXIT) {
      this.loadSprite.setVisible(false)
      this.startSprite.setVisible(false)
      this.exitSprite.setVisible(true)
    }
  }
}

export const s001_opening = new OpeningScene()
