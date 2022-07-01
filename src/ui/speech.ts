import Phaser from 'phaser'

const COLOR_PRIMARY = 0x4e342e
const COLOR_LIGHT = 0x7b5e57
const COLOR_DARK = 0x260e04

const content = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.'

class Demo extends Phaser.Scene {
  constructor () {
    super({
      key: 'examples'
    })
  }

  preload () {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    })

    this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png')
  }

  create () {
    createTextBox(this, 100, 200, {
      wrapWidth: 500
    })
      .start(content, 50)

    createTextBox(this, 100, 500, {
      wrapWidth: 500,
      fixedWidth: 500,
      fixedHeight: 65
    })
      .start(content, 50)
  }

  update () {}
}

const GetValue = Phaser.Utils.Objects.GetValue
var createTextBox = function (scene, x, y, config) {
  const wrapWidth = GetValue(config, 'wrapWidth', 0)
  const fixedWidth = GetValue(config, 'fixedWidth', 0)
  const fixedHeight = GetValue(config, 'fixedHeight', 0)
  const textBox = scene.rexUI.add.textBox({
    x: x,
    y: y,

    background: CreateSpeechBubbleShape(scene, COLOR_PRIMARY, COLOR_LIGHT),

    icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

    // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
    text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

    action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

    space: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 25,
      icon: 10,
      text: 10
    }
  })
    .setOrigin(0, 1)
    .layout()

  textBox
    .setInteractive()
    .on('pointerdown', function () {
      const icon = this.getElement('action').setVisible(false)
      this.resetChildVisibleState(icon)
      if (this.isTyping) {
        this.stop(true)
      } else {
        this.typeNextPage()
      }
    }, textBox)
    .on('pageend', function () {
      if (this.isLastPage) {
        return
      }

      const icon = this.getElement('action').setVisible(true)
      this.resetChildVisibleState(icon)
      icon.y -= 30
      const tween = scene.tweens.add({
        targets: icon,
        y: '+=30', // '+=100'
        ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 500,
        repeat: 0, // -1: infinity
        yoyo: false
      })
    }, textBox)
    // .on('type', function () {
    // })

  return textBox
}

const getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.add.text(0, 0, '', {
    fontSize: '20px',
    wordWrap: {
      width: wrapWidth
    },
    maxLines: 3
  })
    .setFixedSize(fixedWidth, fixedHeight)
}

var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth: fixedWidth,
    fixedHeight: fixedHeight,

    fontSize: '20px',
    wrap: {
      mode: 'word',
      width: wrapWidth
    },
    maxLines: 3
  })
}

var CreateSpeechBubbleShape = function (scene, fillColor, strokeColor) {
  return scene.rexUI.add.customShapes({
    create: { lines: 1 },
    update: function () {
      const radius = 20
      const indent = 15

      const left = 0; const right = this.width
      const top = 0; const bottom = this.height; const boxBottom = bottom - indent
      this.getShapes()[0]
        .lineStyle(2, strokeColor, 1)
        .fillStyle(fillColor, 1)
      // top line, right arc
        .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
      // right line, bottom arc
        .lineTo(right, boxBottom - radius).arc(right - radius, boxBottom - radius, radius, 0, 90)
      // bottom indent
        .lineTo(left + 60, boxBottom).lineTo(left + 50, bottom).lineTo(left + 40, boxBottom)
      // bottom line, left arc
        .lineTo(left + radius, boxBottom).arc(left + radius, boxBottom - radius, radius, 90, 180)
      // left line, top arc
        .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
        .close()
    }
  })
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: Demo
}

const game = new Phaser.Game(config)
