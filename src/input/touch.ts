import nipplejs from 'nipplejs';
import { game } from '../main';
import { FsbKey } from './input';

class Touch {
  manager: nipplejs.JoystickManager | null
  isPressed = FsbKey.None
  holdStart = 0
  holdTimer = 0
  destoryTimer = 0
  touchToInput = new Map<string, FsbKey>()

  constructor() {
    this.manager = null
    this.touchToInput.set('', FsbKey.None)
    this.touchToInput.set('up', FsbKey.Up)
    this.touchToInput.set('down', FsbKey.Down)
    this.touchToInput.set('left', FsbKey.Left)
    this.touchToInput.set('right', FsbKey.Right)
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

    this.manager.on('dir', (evt, data)=> {
      this.isPressed = this.touchToInput.get(data.direction.angle)
      clearTimeout(this.holdTimer)
      clearTimeout(this.destoryTimer)
    })
    
    this.manager.on('start', (event)=> {
      this.holdStart = Date.now()
      this.holdTimer = setTimeout(() => {
        console.log('canceled')
      }, 300)
      clearTimeout(this.destoryTimer)
    })

    this.manager.on('shown', () => {
      document.getElementsByClassName('front')[0].addEventListener('wheel', this.wheelHandler)
      document.getElementsByClassName('back')[0].addEventListener('wheel', this.wheelHandler)
    })

    this.manager.on('end', ()=> {
      clearTimeout(this.holdTimer)
      
      if(this.isPressed == FsbKey.None){ 
        if(Date.now() - this.holdStart < 350){
          console.log('clicked') 
        }
      } else {  this.isPressed = FsbKey.None }

      this.destoryTimer = setTimeout(() => {
        this.destroy()
        this.init()
      }, 3000)

    })
  }

  destroy() {
    this.isPressed = FsbKey.None
    clearTimeout(this.holdTimer)
    this.manager.destroy()
    this.manager = null
  } 

  wheelHandler(event: WheelEvent) {
    const clonedEvt = new WheelEvent('wheel', {
      deltaY: event.deltaY,
    })
    document.getElementsByTagName('canvas')[0].dispatchEvent(clonedEvt)
    event.preventDefault()
    event.stopPropagation()
  }

}

export const touch = new Touch()
touch.init()

document.getElementsByTagName('body')[0].addEventListener('touchstart', (event) => {
  event.preventDefault();  
})