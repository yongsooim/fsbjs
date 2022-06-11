import * as PIXI from 'pixi.js'

PIXI.utils.skipHello()

export const app = new PIXI.Application({
  view: document.getElementById('pixi') as HTMLCanvasElement,
  resizeTo: window,
  antialias: false,
  backgroundColor: 0x000000,
  autoDensity: true
})

let resourceLoadDone = false
document.body.appendChild(app.view)

app.loader.onProgress.add((e) => {
  // console.log(e);
})
app.loader.onComplete.add((e) => {
  console.log('loading done')
  resourceLoadDone = true
})
app.loader.onError.add((e) => {
  console.log('ERROR: ' + e.message)
})


