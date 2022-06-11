import Worker from './timerWorker?worker'
import {app} from '../render/render'
import { sprite } from '../render/render'
import { sprite2 } from '../render/render'

const timerWorker = new Worker()


let previous = Date.now()
timerWorker.onmessage = ev => {
  let now = Date.now()
  console.log(now - previous)
  previous = now
  //app.render()
  sprite2.x+=2
  sprite2.y+=2
  sprite2.rotation+=0.01
}

app.ticker.add(()=>{
  //sprite.x+=2
  //sprite.y+=2
  //sprite.rotation+=0.01
})

export let timerStart = () => {
  timerWorker.postMessage('start')
}