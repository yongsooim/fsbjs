import Phaser from 'phaser'
import { assetRootPath } from '../const'
import * as scene from './scene'
import { keyboard, Keys } from '../input/keyboard'
import { touch } from '../input/touch'
import { FsbKey } from '../input/input'

enum Selectable {
  LOAD = 0,
  START = 1,
  EXIT = 2,
}

class MenuScene extends Phaser.Scene {
  private _selected = Selectable.LOAD as number
  background: Phaser.GameObjects.Image
  container: Phaser.GameObjects.Container
  loadSprite: Phaser.GameObjects.Sprite
  startSprite: Phaser.GameObjects.Sprite
  exitSprite: Phaser.GameObjects.Sprite

  set selected (num : number) {
    if (num < 0) {
      this._selected = 2
    } else if (num > 2) {
      this._selected = 0
    }
    this._selected = num
  }

  get selected () {
    return this._selected
  }

  constructor () {
    super({ key: 'menu' })
  }

  preload () {
    this.load.audio('pusan', assetRootPath + 'mp3/bgm/pusan.mp3')
    this.load.audio('e154', assetRootPath + 'mp3/wav_eft/e154.mp3')
    this.load.audio('e156', assetRootPath + 'mp3/wav_eft/e156.mp3')
    this.load.image('background', assetRootPath + 'graphics/pcxset/st00.png')
  }

  create () {
    // this.container = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2)
    this.container = this.add.container(0, 0)

    this.background = this.add.image(0, 0, 'background')

    this.anims.create({
      key: 'load',
      frameRate: 12,
      frames: this.anims.generateFrameNames('st01Atlas', {
        prefix: 'load',
        start: 0,
        end: 2
      }),
      repeat: -1
    })

    this.anims.create({
      key: 'exit',
      frameRate: 12,
      frames: this.anims.generateFrameNames('st01Atlas', {
        prefix: 'exit',
        start: 0,
        end: 2
      }),
      repeat: -1
    })

    this.anims.create({
      key: 'start',
      frameRate: 12,
      frames: this.anims.generateFrameNames('st01Atlas', {
        prefix: 'start',
        start: 0,
        end: 2
      }),
      repeat: -1
    })

    this.loadSprite = this.add.sprite(0, 0, 'load')
    this.loadSprite.x = 120
    this.loadSprite.y = 75
    this.loadSprite.play('load')
    this.loadSprite.setVisible(false)

    this.startSprite = this.add.sprite(0, 0, 'start')
    this.startSprite.x = 107
    this.startSprite.y = 123
    this.startSprite.play('start')
    this.startSprite.setVisible(false)

    this.exitSprite = this.add.sprite(0, 0, 'exit')
    this.exitSprite.x = 130
    this.exitSprite.y = 167
    this.exitSprite.play('exit')
    this.exitSprite.setVisible(false)

    this.sound.play('pusan', { loop: true })

    this.container.add([this.background, this.startSprite, this.exitSprite, this.loadSprite])

    this.cameras.main.fadeIn(1000, 255, 255, 255)
  }

  update () {
    this.container.x = this.cameras.main.width / 2
    this.container.y = this.cameras.main.height / 2

    this.checkInput()
    this.updateAnimation()

    keyboard.update()
  }

  checkInput () {
    if (keyboard.wasPressed(Keys.Up)) {
      this.sound.play('e156')
      this.selected--
    } else if (keyboard.wasPressed(Keys.Down)) {
      this.sound.play('e156')
      this.selected++
    } else if (keyboard.wasPressed(Keys.Enter)) {
      this.sound.stopAll()
      this.sound.play('e154')
      this.scene.start(scene.testScene)
    }
  }

  updateAnimation () {
    switch (this.selected) {
    case Selectable.LOAD:
      this.loadSprite.setVisible(true)
      this.startSprite.setVisible(false)
      this.exitSprite.setVisible(false)
      break

    case Selectable.START:
      this.loadSprite.setVisible(false)
      this.startSprite.setVisible(true)
      this.exitSprite.setVisible(false)
      break

    case Selectable.EXIT:
      this.loadSprite.setVisible(false)
      this.startSprite.setVisible(false)
      this.exitSprite.setVisible(true)
      break
    }
  }
}

export const menuScene = new MenuScene()