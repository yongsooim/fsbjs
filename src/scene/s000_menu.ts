import Phaser from "phaser"
import { assetRootPath } from "../const"
import { game } from "../main"
import st01 from "./st01.json"
import * as scene from './scene'
import { keyboard, Keys } from "../input/keyboard"

enum Button {
  LOAD = 0,
  START = 1,
  EXIT = 2,
}

class MenuScene extends Phaser.Scene {
  selected = Button.LOAD as number
  background: Phaser.GameObjects.Image
  container: Phaser.GameObjects.Container
  loadSprite: Phaser.GameObjects.Sprite
  startSprite: Phaser.GameObjects.Sprite
  exitSprite: Phaser.GameObjects.Sprite

  constructor() {
    super({ key: "menu",})
  }

  preload() {
    this.load.audio("pusan", assetRootPath + "mp3/bgm/pusan.mp3")
    this.load.audio("e154", assetRootPath + "mp3/wav_eft/e154.mp3")
    this.load.audio("e156", assetRootPath + "mp3/wav_eft/e156.mp3")
    this.load.image("background", assetRootPath + "graphics/pcxset/st00.png")
    this.load.aseprite("st01", assetRootPath + "graphics/pcxset/st01.png", st01)
  }

  create() {    
    //this.container = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2)
    this.container = this.add.container(0, 0)

    this.background = this.add.image(0, 0, "background")

    this.anims.create({
      key: "load",
      frameRate: 12,
      frames: this.anims.generateFrameNames("st01", {
        prefix: "load",
        start: 0,
        end: 2,
      }),
      repeat: -1,
    })

    this.anims.create({
      key: "exit",
      frameRate: 12,
      frames: this.anims.generateFrameNames("st01", {
        prefix: "exit",
        start: 0,
        end: 2,
      }),
      repeat: -1,
    })

    this.anims.create({
      key: "start",
      frameRate: 12,
      frames: this.anims.generateFrameNames("st01", {
        prefix: "start",
        start: 0,
        end: 2,
      }),
      repeat: -1,
    })

    this.loadSprite = this.add.sprite(0, 0, "load")
    this.loadSprite.x = 240
    this.loadSprite.y = 150
    this.loadSprite.play("load")
    this.loadSprite.setVisible(false)

    this.startSprite = this.add.sprite(0, 0, "start")
    this.startSprite.x = 215
    this.startSprite.y = 246
    this.startSprite.play("start")
    this.startSprite.setVisible(false)

    this.exitSprite = this.add.sprite(0, 0, "exit")
    this.exitSprite.x = 259
    this.exitSprite.y = 334
    this.exitSprite.play("exit")
    this.exitSprite.setVisible(false)


    this.sound.play("pusan", { loop: true })

    this.container.add([this.background, this.startSprite, this.exitSprite, this.loadSprite])

    this.cameras.main.fadeIn(1000, 255, 255, 255);
  }
  
  update() {
    this.container.x = this.cameras.main.width / 2
    this.container.y = this.cameras.main.height / 2

    this.checkInput()
    this.updateAnimation()

    keyboard.update()
  }

  checkInput() {
    if (keyboard.wasPressed(Keys.Up)) {
      this.sound.play("e156")
      this.selected--
    } else if (keyboard.wasPressed(Keys.Down)) {
      this.sound.play("e156")
      this.selected++
    } else if (keyboard.wasPressed(Keys.Enter)) {
      this.sound.play("e154")
      game.scene.stop(this)
      game.scene.start(scene.s999_testScene)
    }

    if(this.selected < 0) {
      this.selected = 2
    } else if(this.selected > 2) {
      this.selected = 0
    }
  }

  updateAnimation() {
    switch(this.selected) {
      case Button.LOAD:
        this.loadSprite.setVisible(true)
        this.startSprite.setVisible(false)
        this.exitSprite.setVisible(false)
        break
      
      case Button.START:
        this.loadSprite.setVisible(false)
        this.startSprite.setVisible(true)
        this.exitSprite.setVisible(false)
        break
      
      case Button.EXIT:
        this.loadSprite.setVisible(false)
        this.startSprite.setVisible(false)
        this.exitSprite.setVisible(true)
        break
    }
  }
}

export const s000_menu = new MenuScene()
