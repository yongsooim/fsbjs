import Phaser from "phaser"

class CameraUtil {

  maxZoom = 2
  minZoom = 0.1
  zoomTable = []

  zoomTo(scene: Phaser.Scene, scale: number) {
    scene.cameras.main.zoom = scale
  }

  zoomBy(scene: Phaser.Scene, scale: number) {
    scene.cameras.main.zoom *= scale
  }
}

const cameraUtil = new CameraUtil()

export default cameraUtil
