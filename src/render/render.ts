import * as PIXI from 'pixi.js'
PIXI.utils.skipHello()
export const app = new PIXI.Application({
  view: document.getElementById('pixi') as HTMLCanvasElement,
  resizeTo: window,
  antialias: false,
  backgroundColor: 0x000000,
  autoDensity: true,
  //autoStart: false
})

app.ticker.maxFPS = 59.99

app.ticker.add((delta)=>{
  console.log(delta)
})

console.log(app.ticker)

export let sprite = PIXI.Sprite.from('https://yongsooim.github.io/fsba/graphics/pcxset/logo.ico')
export let sprite2 = PIXI.Sprite.from('https://yongsooim.github.io/fsba/graphics/pcxset/logo.ico')

export let renderMain = () => {
  app.stage.addChild(sprite)
  app.stage.addChild(sprite2)
}

console.log('render started')
