import Phaser from "phaser"

class CameraUtil {
  maxZoom = 10
  minZoom = 0.1
  zoomTable = []

  zoomTo(scene: Phaser.Scene, scale: number) {
    scene.cameras.main.zoom = scale
  }

  zoomBy(scene: Phaser.Scene, scale: number) {
    if(scene.cameras.main.zoom * scale > this.maxZoom){
      scene.cameras.main.zoom = this.maxZoom
    } else if(scene.cameras.main.zoom * scale < this.minZoom){
      scene.cameras.main.zoom = this.minZoom
    } else {
      scene.cameras.main.zoom *= scale
    }
  }

  setBoundsAndCenter(scene:Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
    let screenWidth = scene.game.canvas.width / scene.cameras.main.zoom
    let screenHeight = scene.game.canvas.height / scene.cameras.main.zoom
    let mapWidth = map.widthInPixels
    let mapHeight = map.heightInPixels
    
    if( mapWidth < screenWidth && mapHeight < screenHeight ) {
      scene.cameras.main.setBounds(-screenWidth / 2 + mapWidth / 2, -screenHeight / 2 + mapHeight / 2, screenWidth, screenHeight)
    } else if (mapWidth < screenWidth) {
      scene.cameras.main.setBounds(-screenWidth / 2 + mapWidth / 2, 0, screenWidth, mapHeight)
    } else if (mapHeight < screenHeight) {
      scene.cameras.main.setBounds(0, -screenHeight / 2 + mapHeight / 2, mapWidth, screenHeight)
    } else {
      scene.cameras.main.setBounds(0, 0, mapWidth, mapHeight)
    }

  }

  followUpdate(
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap,
    sprite: Phaser.GameObjects.Sprite
  ) {
    const camera = scene.cameras.main
    //
    //if(camera.worldView.width/2 > sprite.x + 32){ // left bound
    //  camera.worldView.x = 0
    //} else {
    //  camera.centerOn(sprite.x + 32, sprite.y + 54)
    //}
    //
    //console.log(camera.worldView.x)
    //
    //if(camera.worldView.width > map.widthInPixelsInPixels){
    //  console.log('zoomed out')
    //}
    //

    let screenWidth = camera.worldView.width
    let screenHeight = camera.worldView.height
    camera.setBounds(0, 0, map.widthInPixels * 2, map.heightInPixels * 2, true)
    if (map.widthInPixels < screenWidth && map.heightInPixels < screenHeight) {
      camera.centerOn(map.widthInPixels / 2, map.heightInPixels / 2)
    } else if (map.widthInPixels < screenWidth) {

    } else if (map.heightInPixels < screenHeight) {

    }else {

      camera.centerOn(sprite.x + 32, sprite.y + 54)
    }
  }
}

const cameraUtil = new CameraUtil()

export default cameraUtil
