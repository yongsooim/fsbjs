import Phaser from 'phaser'
import cameraUtil from '../camera/camera'

class Mouse {
  wheelToZoom (scene:Phaser.Scene, deltaY: number) {
    if (deltaY > 0) {
      cameraUtil.zoomBy(scene, 0.9)
    } else {
      cameraUtil.zoomBy(scene, 1.1)
    }
  }
}

const mouse = new Mouse()

export default mouse
