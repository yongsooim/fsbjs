import nipplejs from 'nipplejs';
import cameraUtil from '../camera/camera';
import { game } from '../main';
import { FsbKey } from './input';

class Touch {
  manager: nipplejs.JoystickManager | null
  isPressed = FsbKey.None
  wasPressed = FsbKey.None // for Enter and Esc
  holdStart = 0
  holdTimer = 0
  destoryTimer = 0
  touchToInput = new Map<string, FsbKey>()
  touchToKeyboard =  new Map<string, string>()
  lastDirection = '' // Arrow + direction

  constructor() {
    this.manager = null
    this.touchToInput.set('', FsbKey.None)
    this.touchToInput.set('up', FsbKey.Up)
    this.touchToInput.set('down', FsbKey.Down)
    this.touchToInput.set('left', FsbKey.Left)
    this.touchToInput.set('right', FsbKey.Right)
    this.touchToKeyboard.set('up', 'ArrowUp')
    this.touchToKeyboard.set('down', 'ArrowDown')
    this.touchToKeyboard.set('left', 'ArrowLeft')
    this.touchToKeyboard.set('right', 'ArrowRight')
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

    this.manager.on('dir', (evt, data) => {
      globalThis.dispatchEvent(new KeyboardEvent('keyup', {
        key: this.lastDirection,
        code: this.lastDirection
        })
      )

      this.isPressed = this.touchToInput.get(data.direction.angle)
      this.lastDirection = this.touchToKeyboard.get(this.isPressed)
      clearTimeout(this.holdTimer)
      clearTimeout(this.destoryTimer)
      
      globalThis.dispatchEvent(new KeyboardEvent('keydown', {
        key: this.touchToKeyboard.get(data.direction.angle),
        code: this.touchToKeyboard.get(data.direction.angle)
        })
      )
    })
    
    this.manager.on('start', (event)=> {
      this.holdStart = Date.now()
      this.holdTimer = setTimeout(() => {
        globalThis.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Escape',
          code: 'Escape'
          })
        )
      }, 300)
      clearTimeout(this.destoryTimer)
    })

    this.manager.on('shown', () => {
      document.getElementsByClassName('front')[0].addEventListener('wheel', this.wheelHandler)
      document.getElementsByClassName('back')[0].addEventListener('wheel', this.wheelHandler)
    })

    this.manager.on('end', ()=> {
      globalThis.dispatchEvent(new KeyboardEvent('keyup', {
        key: this.lastDirection,
        code: this.lastDirection
        })
      )
      
      globalThis.dispatchEvent(new KeyboardEvent('keyup', {
        key: 'Enter',
        code: 'Enter',
        })
      )

      globalThis.dispatchEvent(new KeyboardEvent('keyup', {
        key: 'Esc',
        code: 'Esc',
        })
      )


      clearTimeout(this.holdTimer)
      
      if(this.isPressed == FsbKey.None){ 
        if(Date.now() - this.holdStart < 350){
          globalThis.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            })
          )
          
          setTimeout(()=> {
            globalThis.dispatchEvent(new KeyboardEvent('keyup', {
              key: 'Enter',
              code: 'Enter',
              })
            )}, 100
          )

        }
      } else {  this.isPressed = FsbKey.None }

      this.destoryTimer = setTimeout(() => {
        this.destroy()
        this.init()
      }, 3000)

    })
  }

  destroy() {
    globalThis.dispatchEvent(new KeyboardEvent('keyup', {
      key: 'Enter',
      code: 'Enter',
      })
    )

    globalThis.dispatchEvent(new KeyboardEvent('keyup', {
      key: 'Esc',
      code: 'Esc',
      })
    )

    globalThis.dispatchEvent(new KeyboardEvent('keyup', {
      key: this.lastDirection,
      code: this.lastDirection,
    })
    )

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

  pinchToZoom(scene: Phaser.Scene, dragScale: number) {
    cameraUtil.zoomBy(scene, dragScale)
  }

  update() {
    this.wasPressed = FsbKey.None
  }
}

export const touch = new Touch()
touch.init()

document.getElementsByTagName('body')[0].addEventListener('touchstart', (event) => {
  event.preventDefault();  
})