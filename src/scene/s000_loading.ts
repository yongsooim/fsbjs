import Phaser from "phaser"
import { assetRootPath } from "../const"
import st01 from "./st01.json"
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'

class Loading extends Phaser.Scene {
  isReady = false
  
  constructor() { 
    super('s000_loading')
  }

  preload() {
    let scene = this
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    this.load.image("logo", assetRootPath + "graphics/pcxset/logo.png")
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            color: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            color: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    
    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: '',
        style: {
            font: '18px monospace',
            color: '#ffffff'
        }
    });
    assetText.setOrigin(0.5, 0.5);

    
    this.load.on('progress', function (value: number) {
      //console.log(value)
      percentText.setText(Math.floor(value * 100).toString() + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
    
    this.load.on('fileprogress', function (file: Phaser.Loader.File, value: number) {
      if(value === 1) {
        console.log(file.key, value)
        assetText.setText('Loading asset: ' + file.key);
      }
    });
    this.load.on('complete', function () {
      
        //progressBar.destroy();
        //progressBox.destroy();
        //loadingText.destroy();
        //percentText.destroy();
        assetText.destroy();
        scene.isReady = true
    });

    this.loadFiles()
  }

  loadFiles() {
    this.load.audio("pusan", assetRootPath + "wav/bgm/pusan.wav")
    this.load.audio("pao", assetRootPath + "wav/bgm/pao.wav")
    this.load.audio("e154", assetRootPath + "wav/wav_eft/e154.wav")
    this.load.audio("e156", assetRootPath + "wav/wav_eft/e156.wav")
    this.load.image("background", assetRootPath + "graphics/pcxset/st00.png")
    this.load.aseprite("st01", assetRootPath + "graphics/pcxset/st01.png", st01)

    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: RexUIPlugin,
      sceneKey: 'rexUI'
    });

    // load the PNG file
    this.load.image("tfi0___p", assetRootPath + "mapset/png_ext/tfi0___p.png")
    this.load.image("tfi0___s", assetRootPath + "mapset/png_ext/tfi0___s.png")

    this.load.spritesheet("player", assetRootPath + "graphics/ase_ps/cmiro00.png", { frameWidth: 64, frameHeight: 96,});
  
    // load the JSON file
    this.load.tilemapTiledJSON("tilemap", assetRootPath + "mapset/tmj/0022_tfi0___.tmj")
    this.load.json('moveProp', assetRootPath + "mapset/json/0022_tfi0___.json");
    this.load.audio('bgm', assetRootPath + "mp3/bgm/vill2.mp3");
 


  }

  create() {
    const logo = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2 - 150, 'logo')
    logo.scale = 2

  }

  update() {
    if(this.isReady) {
      console.log('done')
      this.scene.start('menu')
    }
  }


}


export const s000_loading = new Loading()
