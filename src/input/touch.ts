import nipplejs from 'nipplejs'
import { FsbKey } from './input'

class Touch {
  manager: nipplejs.JoystickManager | null = null

  holdStart = 0
  holdTimer = 0
  enterTimer = 0
  destroyTimer = 0

  touchToKeyboard = new Map<string, string>([
    ['up', 'ArrowUp'],
    ['down', 'ArrowDown'],
    ['left', 'ArrowLeft'],
    ['right', 'ArrowRight']
  ])

  lastDirection = '' // Arrow + direction

  init () {
    if (this.manager != null) return
    globalThis.dispatchEvent(new KeyboardEvent('keyup', { code: this.lastDirection }))
    globalThis.dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter' }))
    globalThis.dispatchEvent(new KeyboardEvent('keyup', { code: 'Esc' }))

    clearTimeout(this.destroyTimer)
    clearTimeout(this.holdTimer)
  
    this.manager = nipplejs.create({
      mode: 'semi',
      color: '#ffffff',
      size: 100,
      fadeTime: 0,
      threshold: 0.5,
      catchDistance: 85,
      restOpacity: 0.7
    })

    this.manager.on('start', (event) => {
      this.holdStart = Date.now()
      this.holdTimer = setTimeout(() => { globalThis.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' })) }, 200)
      clearTimeout(this.destroyTimer)
    })

    this.manager.on('shown', () => {
      document.getElementsByClassName('front')[0].addEventListener('wheel', this.wheelHandler)
      document.getElementsByClassName('back')[0].addEventListener('wheel', this.wheelHandler)
    })

    this.manager.on('dir', (evt, data) => {
      globalThis.dispatchEvent(new KeyboardEvent('keyup', { code: this.lastDirection }))
      globalThis.dispatchEvent(new KeyboardEvent('keydown', { code: this.touchToKeyboard.get(data.direction.angle) }))
      this.lastDirection = this.touchToKeyboard.get(data.direction.angle)
      clearTimeout(this.holdTimer)
      clearTimeout(this.destroyTimer)
    })

    this.manager.on('end', () => {
      clearTimeout(this.holdTimer)
      if(this.lastDirection != ''){
        globalThis.dispatchEvent(new KeyboardEvent('keyup', { code: this.lastDirection }))
      }
      globalThis.dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter' }))
      globalThis.dispatchEvent(new KeyboardEvent('keyup', { code: 'Esc' }))
      if (Date.now() - this.holdStart < 200 && this.lastDirection == '') {
        globalThis.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }))
        this.enterTimer = setTimeout(() => { globalThis.dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter' })) }, 70)
      }
      this.lastDirection = ''

      this.destroyTimer = setTimeout(() => {this.reset()}, 3000)
    })
  }

  destroy() {
    clearTimeout(this.destroyTimer)
    clearTimeout(this.holdTimer)
    if(this.manager){
      this.manager.destroy()
      this.manager = null  
    }
  }

  reset () {
    this.destroy()
    this.init()
  }

  wheelHandler (event: WheelEvent) {
    document.getElementsByTagName('canvas')[0].dispatchEvent(new WheelEvent('wheel', { deltaY: event.deltaY }))
    event.preventDefault()
    event.stopPropagation()
  }
}

export const touch = new Touch()
touch.init()
