import cameraUtil from '../camera/camera'
import { Direction } from '../grid/Direction/Direction'

/** Source code is based on Excalibur.js */

/**
 * Enum representing physical input key codes
 */
export enum Keys {
  // NUMPAD
  Num0 = 'Numpad0',
  Num1 = 'Numpad1',
  Num2 = 'Numpad2',
  Num3 = 'Numpad3',
  Num4 = 'Numpad4',
  Num5 = 'Numpad5',
  Num6 = 'Numpad6',
  Num7 = 'Numpad7',
  Num8 = 'Numpad8',
  Num9 = 'Numpad9',
  NumAdd = 'NumpadAdd',
  NumSubtract = 'NumpadSubtract',
  NumMultiply = 'NumpadMultiply',
  NumDivide = 'NumpadDivide',
  // NumComma = 'NumpadComma', // not x-browser
  NumDecimal = 'NumpadDecimal',
  Numpad0 = 'Numpad0',
  Numpad1 = 'Numpad1',
  Numpad2 = 'Numpad2',
  Numpad3 = 'Numpad3',
  Numpad4 = 'Numpad4',
  Numpad5 = 'Numpad5',
  Numpad6 = 'Numpad6',
  Numpad7 = 'Numpad7',
  Numpad8 = 'Numpad8',
  Numpad9 = 'Numpad9',
  NumpadAdd = 'NumpadAdd',
  NumpadSubtract = 'NumpadSubtract',
  NumpadMultiply = 'NumpadMultiply',
  NumpadDivide = 'NumpadDivide',
  // NumpadComma = 'NumpadComma', // not x-browser
  NumpadDecimal = 'NumpadDecimal',

  // MODIFIERS
  NumLock = 'NumLock',
  ShiftLeft = 'ShiftLeft',
  ShiftRight = 'ShiftRight',
  AltLeft = 'AltLeft',
  AltRight = 'AltRight',

  // NUMBERS
  Key0 = 'Digit0',
  Key1 = 'Digit1',
  Key2 = 'Digit2',
  Key3 = 'Digit3',
  Key4 = 'Digit4',
  Key5 = 'Digit5',
  Key6 = 'Digit6',
  Key7 = 'Digit7',
  Key8 = 'Digit8',
  Key9 = 'Digit9',
  Digit0 = 'Digit0',
  Digit1 = 'Digit1',
  Digit2 = 'Digit2',
  Digit3 = 'Digit3',
  Digit4 = 'Digit4',
  Digit5 = 'Digit5',
  Digit6 = 'Digit6',
  Digit7 = 'Digit7',
  Digit8 = 'Digit8',
  Digit9 = 'Digit9',

  // LETTERS
  A = 'KeyA',
  B = 'KeyB',
  C = 'KeyC',
  D = 'KeyD',
  E = 'KeyE',
  F = 'KeyF',
  G = 'KeyG',
  H = 'KeyH',
  I = 'KeyI',
  J = 'KeyJ',
  K = 'KeyK',
  L = 'KeyL',
  M = 'KeyM',
  N = 'KeyN',
  O = 'KeyO',
  P = 'KeyP',
  Q = 'KeyQ',
  R = 'KeyR',
  S = 'KeyS',
  T = 'KeyT',
  U = 'KeyU',
  V = 'KeyV',
  W = 'KeyW',
  X = 'KeyX',
  Y = 'KeyY',
  Z = 'KeyZ',
  KeyA = 'KeyA',
  KeyB = 'KeyB',
  KeyC = 'KeyC',
  KeyD = 'KeyD',
  KeyE = 'KeyE',
  KeyF = 'KeyF',
  KeyG = 'KeyG',
  KeyH = 'KeyH',
  KeyI = 'KeyI',
  KeyJ = 'KeyJ',
  KeyK = 'KeyK',
  KeyL = 'KeyL',
  KeyM = 'KeyM',
  KeyN = 'KeyN',
  KeyO = 'KeyO',
  KeyP = 'KeyP',
  KeyQ = 'KeyQ',
  KeyR = 'KeyR',
  KeyS = 'KeyS',
  KeyT = 'KeyT',
  KeyU = 'KeyU',
  KeyV = 'KeyV',
  KeyW = 'KeyW',
  KeyX = 'KeyX',
  KeyY = 'KeyY',
  KeyZ = 'KeyZ',

  // SYMBOLS
  Semicolon = 'Semicolon',
  Quote = 'Quote',
  Comma = 'Comma',
  Minus = 'Minus',
  Period = 'Period',
  Slash = 'Slash',
  Equal = 'Equal',
  BracketLeft = 'BracketLeft',
  Backslash = 'Backslash',
  BracketRight = 'BracketRight',
  Backquote = 'Backquote',

  // DIRECTIONS
  Up = 'ArrowUp',
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
  Right = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',

  // OTHER
  Space = 'Space',
  Esc = 'Escape',
  Escape = 'Escape',
  PageUp = 'PageUp',
  PageDown = 'PageDown',
  Enter = 'Enter',
  Delete = 'Delete',
  Backspace = 'Backspace',
  Tab = 'Tab',
  CapsLock = 'CapsLock',
  ScrollLock = 'ScrollLock',
  PrintScreen = 'PrintScreen',
  Pause = 'Pause',
  End = 'End'

}

/**
 * Provides keyboard support for Excalibur.
 */
export class Keyboard {
  history = new Array<Keys>(20);
  private _keys: Keys[] = [];
  private _keysUp: Keys[] = [];
  private _keysDown: Keys[] = [];
  private _keysUpQue: Keys[] = [];

  alias = new Map<Keys, Keys>([
    [Keys.W, Keys.ArrowUp],
    [Keys.A, Keys.ArrowLeft],
    [Keys.S, Keys.ArrowDown],
    [Keys.D, Keys.ArrowRight],

    [Keys.Space, Keys.Enter],
    [Keys.KeyX, Keys.Enter],
    [Keys.X, Keys.Enter],
    [Keys.End, Keys.Enter],

    [Keys.Numpad0, Keys.Esc],
    [Keys.KeyZ, Keys.Esc],
    [Keys.Z, Keys.Esc],
    [Keys.Backquote, Keys.Esc],
    [Keys.Backspace, Keys.Esc],
    [Keys.Delete, Keys.Esc],

    [Keys.Backslash, Keys.KeyC],
    [Keys.PageDown, Keys.KeyC],

    [Keys.ShiftRight, Keys.ShiftLeft]
  ])

  keyToDirection = new Map<Keys, Direction>([
    [Keys.ArrowUp, Direction.UP],
    [Keys.ArrowDown, Direction.DOWN],
    [Keys.ArrowLeft, Direction.LEFT],
    [Keys.ArrowRight, Direction.RIGHT]
  ])

  /**
   * Initialize Keyboard event listeners
   */
  init (global?: GlobalEventHandlers): void {
    if (!global && window.top) {
      try {
        // Try and listen to events on top window frame if within an iframe.
        //
        // See https://github.com/excaliburjs/Excalibur/issues/1294
        //
        // Attempt to add an event listener, which triggers a DOMException on
        // cross-origin iframes
        const noop = () => {

        }
        window.top.addEventListener('blur', noop)
        window.top.removeEventListener('blur', noop)

        // this will be the same as window if not embedded within an iframe
        global = window.top
      } catch {
        // fallback to current frame
        global = window
      }

      global.addEventListener('blur', () => {
        this._keys.length = 0 // empties array efficiently
      })

      // key up is on window because canvas cannot have focus
      global.addEventListener('keyup', (ev: KeyboardEvent) => {
        let code = ev.code as Keys

        if (this.alias.has(code)) {
          code = this.alias.get(code) as Keys
        }

        const key = this._keys.indexOf(code)
        this._keys.splice(key, 1)
        this._keysUp.push(code)
      })

      // key down is on window because canvas cannot have focus
      global.addEventListener('keydown', (ev: KeyboardEvent) => {
        if (ev.repeat) return;

        let code = ev.code as Keys
        this.history.shift()
        this.history.push(code)


        if (this.alias.has(code)) { code = this.alias.get(code) as Keys }

        if (this._keys.indexOf(code) === -1) {
          this._keys.push(code)
          this._keysDown.push(code)
        }
      })
    }
  }

  public update () {
    this._keysDown.length = 0
    this._keysUp = [...this._keysUpQue]
    this._keysUp.forEach(key => { this._keys.splice(this._keys.indexOf(key), 1) })
    this._keysUpQue.length = 0
  }

  /**
   * Gets list of keys being pressed down
   */
  public getKeys (): Keys[] {
    return this._keys
  }

  /**
   * Tests if a certain key was just pressed this frame. This is cleared at the end of the update frame.
   * @param key Test whether a key was just pressed
   */
  public wasPressed (key: Keys): boolean {
    return this._keysDown.indexOf(key) > -1
  }

  /**
   * Tests if a certain key is held down. This is persisted between frames.
   * @param key  Test whether a key is held down
   */
  public isHeld (key: Keys): boolean {
    return this._keys.indexOf(key) > -1
  }

  /**
   * Tests if a certain key was just released this frame. This is cleared at the end of the update frame.
   * @param key  Test whether a key was just released
   */
  public wasReleased (key: Keys): boolean {
    return this._keysUp.indexOf(key) > -1
  }

  public lastDirectionHeld (): Direction {
    const directionIndex = Math.max(
      this._keys.indexOf(Keys.ArrowUp),
      this._keys.indexOf(Keys.ArrowDown),
      this._keys.indexOf(Keys.ArrowLeft),
      this._keys.indexOf(Keys.ArrowRight)
    )
    if (directionIndex !== -1) {
      return this.keyToDirection.get(this._keys[directionIndex])
    } else {
      return Direction.NONE
    }
  }

  public setOneTimePressed (key: Keys): void {
    this._keysDown.push(key)
    this._keys.push(key)
    this._keysUpQue.push(key)
  }
}

export const keyboard = new Keyboard()
