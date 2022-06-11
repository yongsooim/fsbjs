import * as PIXI from 'pixi.js'
PIXI.utils.skipHello()

class Render {
  app = new PIXI.Application({
    view: document.getElementById('pixi') as HTMLCanvasElement,
    resizeTo: window,
    antialias: false,
    backgroundColor: 0x000000,
    autoDensity: true
  })


}


