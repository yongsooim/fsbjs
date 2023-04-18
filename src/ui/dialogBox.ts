import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox'
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
import NinePatch2 from 'phaser3-rex-plugins/plugins/ninepatch2.js';

import Phaser, { Scene } from 'phaser'
import { testScene } from '../scene/testScene'

declare class SceneWithRexUI extends Phaser.Scene {
  rexUI: RexUIPlugin
}

const COLOR_PRIMARY = 0x4e342e
const COLOR_LIGHT = 0x7b5e57
const COLOR_DARK = 0x260e04

export let createTextBox = function (scene: SceneWithRexUI, x: number, y: number, wrapWidth: number, fixedWidth16: number, fixedHeight16: number) {

  const textBox = scene.rexUI.add.textBox({
    x: x,
    y: y,

    background: getBubble(scene, fixedWidth16, fixedHeight16),
    text: getTagText(scene, wrapWidth, fixedWidth16 * 16, fixedHeight16 * 16),

    action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

    space: { left: 16, right: 16, top: 16, bottom: 16, text: 16 }
  })
    .setOrigin(0, 1)
    .layout()

  textBox
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

  textBox.setDepth(9999)

  return textBox
}

let getTagText = function (scene: SceneWithRexUI, wrapWidth: number, fixedWidth: number, fixedHeight: number) {
  return scene.rexUI.add.tagText(0, 0, '', {
    tags: {
      'tag0': {
        fontSize: '14px',
        fontFamily: 'Dotumche',
        color: '#F8E6D1',
        fontStyle: 'bold',
        stroke: {
          color: '#000000',
          thickness: 0,
        },
        shadow: {
          color: '#000000',
          blur: 1,
          offsetX: 2,
          offsetY: 2,
        }

      },
      'tag1': {
        fontSize: '16px',
        fontFamily: '돋움체',
        stroke: {
          color: '#FFFFFF',
          thickness: 1,
        }
      }

    },
    fixedWidth: fixedWidth,
    fixedHeight: fixedHeight,
    fontStyle: 'bold',
    resolution: 1,
    color: '#FFFFFF',
    shadow: {
      color: 0x000000,
      blur: 1,
      offsetX: 1,
      offsetY: 1,
    },
    wrap: {
      mode: 'char',
      width: wrapWidth
    },
    maxLines: 5,
    lineSpacing: 8,
    padding: { top: 2 }
  })
}

function getBubble(scene: Phaser.Scene, fixedWidth16: number, fixedHeight16: number) {
  const ninePatch = new NinePatch2(scene, 0, 0, fixedWidth16 * 16, fixedHeight16 * 16, {
    key: 'whdlgbox_temp',
    columns: [16, 16, 16],
    rows: [16, 16, 16],
    stretchMode: 'repeat'
  }).setAlpha(0.7).setDepth(100).setTint(0xCF484E)

  scene.add.existing(ninePatch)

  return ninePatch
}