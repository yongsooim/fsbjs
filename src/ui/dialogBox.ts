import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox'
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext'
import Phaser, { Scene } from 'phaser'
import { testScene } from '../scene/testScene'

export let createDlgBox = (scene:Phaser.Scene) => {
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
   //textContainer.setDepth(9999999)

   boxContainer.add(text)
   boxContainer.setDepth(9999999)

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