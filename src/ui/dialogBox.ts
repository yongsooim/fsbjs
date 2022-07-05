import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox'
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
import Phaser, { Scene } from 'phaser'
import { testScene } from '../scene/testScene'

declare class SceneWithRexUI extends Phaser.Scene {
   rexUI : RexUIPlugin
}

const COLOR_PRIMARY = 0x4e342e
const COLOR_LIGHT = 0x7b5e57
const COLOR_DARK = 0x260e04

const GetValue = Phaser.Utils.Objects.GetValue

export let createTextBox = function (scene: SceneWithRexUI, x: number, y: number, config: object) {
   const wrapWidth = GetValue(config, 'wrapWidth', 0)
   const fixedWidth = GetValue(config, 'fixedWidth', 0)
   const fixedHeight = GetValue(config, 'fixedHeight', 0)
   const textBox = scene.rexUI.add.textBox({
     x: x,
     y: y,
 
     //background: CreateSpeechBubbleShape(scene, COLOR_PRIMARY, COLOR_LIGHT),
     //background: new Phaser.GameObjects.Sprite(scene, 0, 0, 'whdlgboxAtlas', 'center'),
     background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),
 
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
 
 const getBuiltInText = function (scene: Phaser.Scene, wrapWidth: number, fixedWidth: number, fixedHeight: number) {
   return scene.add.text(0, 0, '', {
     fontSize: '20px',
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
 
     fontSize: '20px',
     wrap: {
       mode: 'word',
       width: wrapWidth
     },
     maxLines: 3
   })
 }
 
 let CreateSpeechBubbleShape = function (scene: SceneWithRexUI, fillColor: number, strokeColor: number) {
   return scene.rexUI.add.customShapes({
     create: { lines: 1 },
     update: function () {
       const radius = 20
       const indent = 15
 
       const left = 0; const right = this.width
       const top = 0; const bottom = this.height; const boxBottom = bottom - indent
       this.getShapes()[6]
         .lineStyle(2, strokeColor, 1)
         .fillStyle(fillColor, 1)
     }
   })
 }

export let createDlgBox = (scene: SceneWithRexUI) => {

   let textContainer = new Phaser.GameObjects.Container(scene, 0, 0)
   let boxContainer = new Phaser.GameObjects.Container(scene, 0, 0)

   let text = new Phaser.GameObjects.Text(scene, -15, 0, '대화상자 테스트', {
      font: '15px Batangche',
      color: '#ffffff',
      shadow: {
         color: '#ffffff',
         blur: 2,
         offsetX: 2,
         offsetY: 2
      }
   })

   let offsetX = 40
   let offsetY = -20
   let width = 16
   let height = 16

   let topleft = new Phaser.GameObjects.Sprite(scene, offsetX, offsetY, 'whdlgboxAtlas', 'topleft')
   let top = new Phaser.GameObjects.Sprite(scene, offsetX + 16, offsetY, 'whdlgboxAtlas', 'top')
   let topright = new Phaser.GameObjects.Sprite(scene, offsetX + 32, offsetY, 'whdlgboxAtlas', 'topright')
   let left = new Phaser.GameObjects.Sprite(scene, offsetX, offsetY + 16, 'whdlgboxAtlas', 'left')
   let center = new Phaser.GameObjects.Sprite(scene, offsetX + 16, offsetY + 16, 'whdlgboxAtlas', 'center')
   let right = new Phaser.GameObjects.Sprite(scene, offsetX + 32, offsetY + 16, 'whdlgboxAtlas', 'right')
   let bottomleft = new Phaser.GameObjects.Sprite(scene, offsetX, offsetY + 32, 'whdlgboxAtlas', 'bottomleft')
   let bottom = new Phaser.GameObjects.Sprite(scene, offsetX + 16, offsetY + 32, 'whdlgboxAtlas', 'bottom')
   let bottomright = new Phaser.GameObjects.Sprite(scene, offsetX + 32, offsetY + 32, 'whdlgboxAtlas', 'bottomright')

   text.setDepth(1)
   boxContainer.add(topleft)
   boxContainer.add(top)
   boxContainer.add(topright)
   boxContainer.add(left)
   boxContainer.add(center)
   boxContainer.add(right)
   boxContainer.add(bottomleft)
   boxContainer.add(bottom)
   boxContainer.add(bottomright)
   
   //textContainer.add(text)
   //textContainer.setDepth(1000)

   boxContainer.add(text)
   boxContainer.setDepth(1000)

   topleft.setAlpha(0.7)
   top.setAlpha(0.7)
   topright.setAlpha(0.7)
   left.setAlpha(0.7)
   center.setAlpha(0.7)
   right.setAlpha(0.7)
   bottomleft.setAlpha(0.7)
   bottom.setAlpha(0.7)
   bottomright.setAlpha(0.7)

   scene.add.existing(boxContainer)
   scene.add.existing(textContainer)
   return boxContainer
}
