import Phaser from 'phaser'

class CameraUtil {
  maxZoom = 4
  minZoom = 0.85
  zoomTable = []

  zoomTo (scene: Phaser.Scene, zoomTarget: number) {
    if(zoomTarget > this.maxZoom) {
      zoomTarget = this.maxZoom
    } else if (zoomTarget < this.minZoom) {
      zoomTarget = this.minZoom
    }   
    scene.cameras.main.zoom = zoomTarget
    
  }

  zoomBy (scene: Phaser.Scene, scale: number) {
    if (scene.cameras.main.zoom * scale > this.maxZoom) {
      scene.cameras.main.zoom = this.maxZoom
    } else if (scene.cameras.main.zoom * scale < this.minZoom) {
      scene.cameras.main.zoom = this.minZoom
    } else {
      scene.cameras.main.zoom *= scale
    }
  }

  setBoundsAndCenter (scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
    const screenWidth = scene.game.canvas.width / scene.cameras.main.zoom
    const screenHeight = scene.game.canvas.height / scene.cameras.main.zoom
    const mapWidth = map.widthInPixels
    const mapHeight = map.heightInPixels

    if (mapWidth < screenWidth && mapHeight < screenHeight) {
      scene.cameras.main.setBounds(-screenWidth / 2 + mapWidth / 2, -screenHeight / 2 + mapHeight / 2, screenWidth, screenHeight)
    } else if (mapWidth < screenWidth) {
      scene.cameras.main.setBounds(-screenWidth / 2 + mapWidth / 2, 0, screenWidth, mapHeight)
    } else if (mapHeight < screenHeight) {
      scene.cameras.main.setBounds(0, -screenHeight / 2 + mapHeight / 2, mapWidth, screenHeight)
    } else {
      scene.cameras.main.setBounds(0, 0, mapWidth, mapHeight)
    }
  }
}

const cameraUtil = new CameraUtil()

export default cameraUtil
