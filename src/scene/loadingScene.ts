import Phaser from 'phaser'
import { assetRootPath } from '../const'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
import * as resource from '../resource/resource'
import { keyboard } from '../input/keyboard'
class LoadingScene extends Phaser.Scene {
  loadingDone = false

  constructor () {
    super('loading')
  }

  preload () {
    const scene = this
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    const progressBar = this.add.graphics()
    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect((width - 270 ) / 2, (height - 50)  / 2, 320, 50)

    this.load.image('logo', assetRootPath + 'graphics/pcxset/logo.png')
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff'
      }
    })
    percentText.setOrigin(0.5, 0.5)

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: '',
      style: {
        font: '18px monospace',
        color: '#ffffff'
      }
    })
    assetText.setOrigin(0.5, 0.5)

    this.load.on('progress', function (value: number) {
      // console.log(value)
      percentText.setText(Math.floor(value * 100).toString() + '%')
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect((width - 300 ) / 2, (width - 30 ) / 2 , 300 * value, 30)
    })

    this.load.on('fileprogress', function (file: Phaser.Loader.File, value: number) {
      if (value === 1) {
        //console.log(file.key, value)
        assetText.setText('Loading asset: ' + file.key)
      }
    })
    this.load.on('complete', function () {
      // progressBar.destroy();
      // progressBox.destroy();
      // loadingText.destroy();
      // percentText.destroy();
      // assetText.destroy();
      scene.loadingDone = true
    })

    this.loadFiles()
  }

  loadFiles () {

    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: RexUIPlugin,
      sceneKey: 'rexUI'
    })

    // load the JSON file
    this.loadGraphics()
    this.loadMapset()
    this.loadSound()
  }

  loadGraphics() {
    for (const png of resource.fmList) { this.load.image(png, assetRootPath + 'graphics/ase_fm/' + png + '.png', ) }
    for (const png of resource.psList) { this.load.spritesheet(png, assetRootPath + 'graphics/ase_ps/' + png + '.png', { frameWidth: 64, frameHeight: 96 })}
    for (const png of resource.pcxList) { this.load.image(png, assetRootPath + 'graphics/pcxset/' + png + '.png')}
    for (const atlas of resource.pcxAtlasList) { 
      this.load.atlas(atlas + 'Atlas', assetRootPath + 'graphics/pcxset/' + atlas + '.png', assetRootPath + 'graphics/pcxset/atlas/' + atlas + '.json')
    }
  }

  loadMapset() {
    for (const tmj of resource.tmjList) { this.load.tilemapTiledJSON(tmj, assetRootPath + 'mapset/tmj/' + tmj + '.tmj')}
    for (const png of resource.pngList) { this.load.image(png, assetRootPath + 'mapset/png_ext/' + png + '.png')}
    for (const json of resource.jsonList) { this.load.json(json, assetRootPath + 'mapset/json/' + json + '.json')}
  }

  loadSound() {
    const extension = 'mp3'
    //const extension = 'wav'
    for (const wav of resource.fxList) { this.load.audio(wav, assetRootPath + extension + '/wav_eft/' + wav + '.' + extension)}
    for (const wav of resource.seList) { this.load.audio(wav, assetRootPath + extension + '/se_event/' + wav + '.' + extension)}
    for (const wav of resource.bgmList) { this.load.audio(wav, assetRootPath + extension + '/bgm/' + wav + '.' + extension)}
  }

  create () {
    const width = this.cameras.main.width
    const height = this.cameras.main.height
    const logo = this.add.image(width / 2, height / 2 - 150, 'logo')
    logo.scale = 2
  }

  update () {
    if (this.loadingDone) {
      const width = this.cameras.main.width
      const height = this.cameras.main.height  

      this.add.text(width / 2, height / 2 , 'Press any to start', { font: '18px monospace' })

      if(keyboard.getKeys().length != 0) {
        keyboard.update()
        //this.scene.start('menu')
        this.scene.start('test')
        this.scene.start('debug')
      }
      keyboard.update()
      //this.scene.start('test')
      //this.scene.start('debug')
    }
  }
}

export const loadingScene = new LoadingScene()
