import Phaser from 'phaser'
import { assetRootPath } from '../const'
import st01 from './st01.json'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
import { tmjList } from '../map/tmjList'
import { pngList } from '../map/pngList'
import { fxList } from '../resource/fxList'
import { bgmList } from '../resource/bgmList'
import { seList } from '../resource/seList'
import { jsonList } from '../map/jsonList'
import { fmList } from '../resource/fmList'
import { psList } from '../resource/psList'
import { pcxList } from '../resource/pcxList'
class Loading extends Phaser.Scene {
  isReady = false

  constructor () {
    super('s000_loading')
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
        console.log(file.key, value)
        assetText.setText('Loading asset: ' + file.key)
      }
    })
    this.load.on('complete', function () {
      // progressBar.destroy();
      // progressBox.destroy();
      // loadingText.destroy();
      // percentText.destroy();
      // assetText.destroy();
      scene.isReady = true
    })

    this.loadFiles()
  }

  loadFiles () {
    this.load.audio('pusan', assetRootPath + 'mp3/bgm/pusan.mp3')
    this.load.audio('pao', assetRootPath + 'mp3/bgm/pao.mp3')
    this.load.audio('e154', assetRootPath + 'mp3/wav_eft/e154.mp3')
    this.load.audio('e156', assetRootPath + 'mp3/wav_eft/e156.mp3')
    this.load.image('background', assetRootPath + 'graphics/pcxset/st00.png')
    this.load.atlas('st01', assetRootPath + 'graphics/pcxset/st01.png', st01)

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
    for (const png of fmList) {
      this.load.image(png, assetRootPath + 'graphics/ase_fm/' + png + '.png', )
    }
    for (const png of psList) {
      this.load.spritesheet(png, assetRootPath + 'graphics/ase_ps/' + png + '.png', { frameWidth: 64, frameHeight: 96 })
    }
    for (const png of pcxList) {
      this.load.image(png, assetRootPath + 'graphics/pcxset/' + png + '.png')
    }
  }

  loadMapset() {
    for (const tmj of tmjList) {
      this.load.tilemapTiledJSON(tmj, assetRootPath + 'mapset/tmj/' + tmj + '.tmj')
    }
    for (const png of pngList) {
      this.load.image(png, assetRootPath + 'mapset/png_ext/' + png + '.png')
    }
    for (const json of jsonList) {
      this.load.json(json, assetRootPath + 'mapset/json/' + json + '.json')
    }
  }

  loadSound() {
    const extension = 'mp3'
    //const extension = 'wav'
    for (const wav of fxList) {
      this.load.audio(wav, assetRootPath + extension + '/wav_eft/' + wav + '.' + extension)
    }
    for (const wav of seList) {
      this.load.audio(wav, assetRootPath + extension + '/se_event/' + wav + '.' + extension)
    }
    for (const wav of bgmList) {
      this.load.audio(wav, assetRootPath + extension + '/bgm/' + wav + '.' + extension)
    }
  }

  create () {
    const width = this.cameras.main.width
    const height = this.cameras.main.height
    const logo = this.add.image(width / 2, height / 2 - 150, 'logo')
    logo.scale = 2
  }

  update () {
    if (this.isReady) {
      this.scene.start('menu')
    }
  }
}

export const s000_loading = new Loading()
