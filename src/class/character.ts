import Phaser from 'phaser'

class Character extends Phaser.GameObjects.Container {
  container: Phaser.GameObjects.Container
  sprite: Phaser.GameObjects.Sprite

  constructor(scene: Phaser.Scene, x: number, y: number, spriteKey: string) {
    super(scene, x, y)
    this.sprite = this.scene.add.sprite(0, 0, spriteKey)
    this.add(this.sprite)
    this.scene.add.existing(this)
  }
}
