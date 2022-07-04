import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox'
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext'
import Phaser, { Scene } from 'phaser'
import { testScene } from '../scene/testScene'

export let createDlgBox = (scene:Phaser.Scene) => {
   let container = new Phaser.GameObjects.Container(scene, 0, 0)

   let text = new Phaser.GameObjects.Text(scene, 0, 0, '대화상자 테스트', {
      fontSize: '16px',
      color: '#ffffff',
   })

   let rectangle = new Phaser.GameObjects.Rectangle(scene, 0, 0, 200, 50, 0xeec0cb)
   rectangle.setDepth(0)
   text.setDepth(1)
   container.add(rectangle)
   container.add(text)
   container.setDepth(9999999)

   rectangle.setAlpha(0.7)
   scene.add.existing(container)
   return container
}