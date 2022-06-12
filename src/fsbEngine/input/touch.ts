import {vec} from 'excalibur';
import nipplejs from 'nipplejs'

let manager = nipplejs.create({
  color: '#484848',
  fadeTime: 400,
  size: 70,
  mode: 'dynamic',
  catchDistance: 50,

})
class Touch {

  vector = vec(0, 0)

  isPressed = {
    Up: false,
    Down: false,
    Right: false,
    Left: false,
    UpLeft: false,
    UpRight: false,
    DownLeft: false,
    DownRight: false
  };

  init () {

    this.initNipple()
  }

  initNipple = () => {
    manager.on('move', (evt, nipple) => {
      document.getElementsByClassName('front')[0].removeEventListener('wheel', wheelHandler)
      document.getElementsByClassName('front')[0].addEventListener('wheel', wheelHandler)
      document.getElementsByClassName('back')[0].removeEventListener('wheel', wheelHandler)
      document.getElementsByClassName('back')[0].addEventListener('wheel', wheelHandler)

      document.getElementsByClassName('front')[0].removeEventListener('pointerdown', pointerDownHandler)
      document.getElementsByClassName('front')[0].addEventListener('pointerdown', pointerDownHandler)
      document.getElementsByClassName('back')[0].removeEventListener('pointerdown', pointerDownHandler)
      document.getElementsByClassName('back')[0].addEventListener('pointerdown', pointerDownHandler)


      
      this.vector.x = nipple.vector.x
      this.vector.y = nipple.vector.y

      if (nipple.distance > 10) {
        if (nipple.angle.radian <= Math.PI / 8 || nipple.angle.radian > (Math.PI * 15) / 8) {
          touch.isPressed.Up = false
          touch.isPressed.Down = false
          touch.isPressed.Left = false
          touch.isPressed.Right = true

          touch.isPressed.UpLeft = false
          touch.isPressed.UpRight = false
          touch.isPressed.DownLeft = false
          touch.isPressed.DownRight = false
        } else if ((Math.PI * 1) / 8 <= nipple.angle.radian && nipple.angle.radian < (Math.PI * 3) / 8) {
          touch.isPressed.Up = true
          touch.isPressed.Down = false
          touch.isPressed.Left = false
          touch.isPressed.Right = true

          touch.isPressed.UpLeft = false
          touch.isPressed.UpRight = false
          touch.isPressed.DownLeft = false
          touch.isPressed.DownRight = false
        } else if ((Math.PI * 3) / 8 <= nipple.angle.radian && nipple.angle.radian < (Math.PI * 5) / 8) {
          touch.isPressed.Up = true
          touch.isPressed.Down = false
          touch.isPressed.Left = false
          touch.isPressed.Right = false

          touch.isPressed.UpLeft = false
          touch.isPressed.UpRight = false
          touch.isPressed.DownLeft = false
          touch.isPressed.DownRight = false
        } else if ((Math.PI * 5) / 8 <= nipple.angle.radian && nipple.angle.radian < (Math.PI * 7) / 8) {
          touch.isPressed.Up = true
          touch.isPressed.Down = false
          touch.isPressed.Left = true
          touch.isPressed.Right = false

          touch.isPressed.UpLeft = false
          touch.isPressed.UpRight = false
          touch.isPressed.DownLeft = false
          touch.isPressed.DownRight = false
        } else if ((Math.PI * 7) / 8 <= nipple.angle.radian && nipple.angle.radian < (Math.PI * 9) / 8) {
          touch.isPressed.Up = false
          touch.isPressed.Down = false
          touch.isPressed.Left = true
          touch.isPressed.Right = false

          touch.isPressed.UpLeft = false
          touch.isPressed.UpRight = false
          touch.isPressed.DownLeft = false
          touch.isPressed.DownRight = false
        } else if ((Math.PI * 9) / 8 <= nipple.angle.radian && nipple.angle.radian < (Math.PI * 11) / 8) {
          touch.isPressed.Up = false
          touch.isPressed.Down = true
          touch.isPressed.Left = true
          touch.isPressed.Right = false

          touch.isPressed.UpLeft = false
          touch.isPressed.UpRight = false
          touch.isPressed.DownLeft = false
          touch.isPressed.DownRight = false
        } else if ((Math.PI * 11) / 8 <= nipple.angle.radian && nipple.angle.radian < (Math.PI * 13) / 8) {
          touch.isPressed.Up = false
          touch.isPressed.Down = true
          touch.isPressed.Left = false
          touch.isPressed.Right = false

          touch.isPressed.UpLeft = false
          touch.isPressed.UpRight = false
          touch.isPressed.DownLeft = false
          touch.isPressed.DownRight = false
        } else if ((Math.PI * 13) / 8 <= nipple.angle.radian && nipple.angle.radian < (Math.PI * 15) / 8) {
          touch.isPressed.Up = false
          touch.isPressed.Down = true
          touch.isPressed.Left = false
          touch.isPressed.Right = true

          touch.isPressed.UpLeft = false
          touch.isPressed.UpRight = false
          touch.isPressed.DownLeft = false
          touch.isPressed.DownRight = false
        }
      }
    })

    manager.on('end', () => {
      touch.isPressed.Up = false
      touch.isPressed.Down = false
      touch.isPressed.Left = false
      touch.isPressed.Right = false
    })
  };
}

export const touch = new Touch()


const wheelHandler = (evt: Event) => {
  // for glueing viewport wheel zoom and nipple element event
  // it is to solve the problem that wheel zoom is not working while pointer is on nipplejs event

  const originalEvt = evt as WheelEvent

  const clonedEvt = new WheelEvent('wheel', {
    deltaMode: originalEvt.deltaMode,
    deltaX: originalEvt.deltaX,
    deltaY: originalEvt.deltaY,
    deltaZ: originalEvt.deltaZ,
    clientX: originalEvt.clientX,
    clientY: originalEvt.clientY,
    screenX: originalEvt.screenX,
    screenY: originalEvt.screenY,
    relatedTarget: originalEvt.relatedTarget
  })
  //document.getElementById('app')?.dispatchEvent(clonedEvt)
  document.dispatchEvent(clonedEvt)
 
}


const pointerDownHandler = (evt: Event) => {
  // for glueing viewport wheel zoom and nipple element event
  // it is to solve the problem that wheel zoom is not working while pointer is on nipplejs event

  console.log('clicked')
  const originalEvt = evt as PointerEvent

  const clonedEvt = new PointerEvent('pointerdown', {
    clientX: originalEvt.clientX,
    clientY: originalEvt.clientY,
    screenX: originalEvt.screenX,
    screenY: originalEvt.screenY,
    relatedTarget: originalEvt.relatedTarget
  })
  //document.getElementById('app')?.dispatchEvent(clonedEvt)
  document.dispatchEvent(clonedEvt)
 
}




document.addEventListener('pointerdown', ()=>{
  console.log('pointerdown on body')
})
