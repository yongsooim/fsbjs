
export function wheelToZoom (scene:Phaser.Scene , deltaY: number) {
  if (deltaY > 0) {
    scene.cameras.main.zoom /= 1.1
  } else {
    scene.cameras.main.zoom *= 1.1
  }
}