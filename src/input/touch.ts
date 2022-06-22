import nipplejs from 'nipplejs';
import { game } from '../main';

class Touch {
  manager: nipplejs.JoystickManager | null
  isPressed = ''
  holdStart = 0
  holdTimer = 0
  destoryTimer = 0

  constructor() {
    this.manager = null
  }

  init() {
    if(this.manager != null) return 

    this.manager = nipplejs.create({
      mode: 'semi',
      color: '#ffffff',
      size: 100,
      fadeTime: 0,
      threshold: 0.5,
      catchDistance: 85,
      restOpacity: 0.7
    })

    
    this.manager.on('move', (evt, data)=> {
      console.log(data)
    })

    this.manager.on('dir', (evt, data)=> {
      this.isPressed = data.direction.angle as string
      clearTimeout(this.holdTimer)
      clearTimeout(this.destoryTimer)
    })
    
    this.manager.on('start', (event)=> {
      this.holdStart = Date.now()
      this.holdTimer = setTimeout(() => { console.log('calceled')}, 300)
      clearTimeout(this.destoryTimer)
    })

    this.manager.on('shown', ()=> {
      document.getElementsByClassName('front')[0].addEventListener('wheel', wheelHandler)
      document.getElementsByClassName('back')[0].addEventListener('wheel', wheelHandler)
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
      this.destoryTimer = setTimeout(() => {
        this.destroy()
        this.init()
      }, 5000)

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
  evt.preventDefault()
  evt.stopPropagation()
}

document.getElementsByTagName('body')[0].addEventListener('touchstart', (event) => {
  event.preventDefault();  
})