// fixed 60 fps
// 17, 17, 16 = 50ms

let running = false
let error = 0
let now = Date.now()
let startTime = now
let nextExecute = 0
const gap = 2 // how much earlier wakeup before nextExecute, and check loop until reach nextExecute
let counter = 0 // 0, 1, 2
let interval = 17 // 17, 17, 16

onmessage = (ev) => {
  if (ev.data.cmd === 'stop') {
    running = false
  } else if (ev.data === 'start') {
    console.log('started')
    running = true
    now = Date.now()
    nextExecute = now + interval
    timerId = setTimeout(counting, interval - gap - error)
  } else if (ev.data === 'stop') {
    clearTimeout(timerId)
    running = false
  } else if (ev.data === 'close') {
    clearTimeout(timerId)
    running = false
    self.close()
  }
}

let timerId: number
nextExecute = now + interval
const counting = () => {

  counter++
  if(counter > 2){
    counter = 0
    interval = 16
  } else {
    interval = 17
  }

  // wakeup in advance
  now = Date.now()
  while (now < nextExecute) { // wating for target time
    now = Date.now()
  }
  self.postMessage(0)
  error = now - nextExecute
  nextExecute = nextExecute + interval
  timerId = setTimeout(() => {
    if (running) {
      counting()
    }
  }, interval - gap - error)
}

// some more calcuation after post beat done?
postMessage('ready')
