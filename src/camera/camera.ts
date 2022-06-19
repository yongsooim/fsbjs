import Phaser from "phaser"

export function zoomTo(scene: Phaser.Scene, scale: number) {
  scene.cameras.main.zoom = scale
}

export function zoomBy(scene: Phaser.Scene, scale: number) {
  scene.cameras.main.zoom *= scale
}
