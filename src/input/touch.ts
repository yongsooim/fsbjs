import nipplejs from 'nipplejs';
import { game } from '../main';

class Touch {
  manager: nipplejs.JoystickManager | null
  isPressed = ''
  holdStart = 0
  holdTimer = 0

  constructor() {
    this.manager = null
  }

  init() {
    if(this.manager != null) return 

    this.manager = nipplejs.create({
      mode: 'dynamic',
      size: 70,
      fadeTime: 0,
      threshold: 0.2
    })

    this.manager.on('dir', (evt, data)=> {
      this.isPressed = data.direction.angle as string
      clearTimeout(this.holdTimer)
    })
    
    this.manager.on('start', ()=> {
      this.holdStart = Date.now()
      this.holdTimer = setTimeout(() => { console.log('calceled')}, 300)
    })

    this.manager.on('shown', ()=> {
      document.getElementsByClassName('front')[0].addEventListener('wheel', wheelHandler)
    })

    this.manager.on('end', ()=> {
      clearTimeout(this.holdTimer)
      if(this.isPressed == ''){
        if(Date.now() - this.holdStart < 350){
          console.log('clicked')
        }
      } else {
        this.isPressed = ''
      }
    })
  }

  destroy() {
    this.isPressed = ''
    clearTimeout(this.holdTimer)
    this.manager.destroy()
    this.manager = null
  } 
}

export const touch = new Touch()
touch.init()

const wheelHandler = (evt: Event) => {
  // for glueing viewport wheel zoom and nipple element event
  // it is to solve the problem that wheel zoom is not working while pointer is on nipplejs event
  const originalEvt = evt as WheelEvent

  const clonedEvt = new WheelEvent('wheel', {
    deltaY: originalEvt.deltaY,
  })
  document.getElementsByTagName('canvas')[0].dispatchEvent(clonedEvt)
}
