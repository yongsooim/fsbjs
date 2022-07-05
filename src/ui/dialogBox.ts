import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox'
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
import NinePatch2 from 'phaser3-rex-plugins/plugins/ninepatch2.js';

import Phaser, { Scene } from 'phaser'
import { testScene } from '../scene/testScene'

declare class SceneWithRexUI extends Phaser.Scene {
   rexUI : RexUIPlugin
}

const COLOR_PRIMARY = 0x4e342e
const COLOR_LIGHT = 0x7b5e57
const COLOR_DARK = 0x260e04

export let createTextBox = function (scene: SceneWithRexUI, x: number, y: number, wrapWidth: number, fixedWidth: number, fixedHeight: number) {
    //const background = scene.add.sprite(0, 0, 'whdlgboxAtlas', 'center')
    //background.alpha = 0.7

    const ninePatch = new NinePatch2(scene, x, y, fixedWidth, fixedHeight, {
      key: 'whdlgbox_temp',
      columns: [16, 16, 16],
      rows: [16, 16, 16],
      stretchMode: 'repeat'
    }).setAlpha(0.7).setDepth(9999).setTint(0xFF684E)

    scene.add.existing(ninePatch)

    const textBox = scene.rexUI.add.textBox({
     x: x,
     y: y,
 
     background: ninePatch,

     text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),
     //text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
 
     
     action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),
 
     space: {
       left: 16,
       right: 16,
       top: 16,
       bottom: 16,
       text: 16
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
 
     textBox.setDepth(9999)

   return textBox
 }
 
 const getBuiltInText = function (scene: Phaser.Scene, wrapWidth: number, fixedWidth: number, fixedHeight: number) {
   return scene.add.text(0, 0, '', {
     fontSize: '15px',
     wordWrap: {
       width: wrapWidth
     },
     maxLines: 3
   })
     .setFixedSize(fixedWidth, fixedHeight)
 }
 
 let getBBcodeText = function (scene: SceneWithRexUI, wrapWidth: number, fixedWidth: number, fixedHeight: number) {
   return scene.rexUI.add.BBCodeText(0, 0, '', {
     fixedWidth: fixedWidth,
     fixedHeight: fixedHeight,
     fontSize: '15px',
     fontFamily: 'Dotumche',
     fontStyle: '',
    color: '#E4C6B1',
     shadow: {
        color: 0x000000,
        blur: 2,
        offsetX: 1,
        offsetY: 1,
      },
     wrap: {
       mode: 'char',
       width: wrapWidth
     },
     maxLines: 5,
     lineSpacing: 10,
   })
 }
 