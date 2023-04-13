import cameraUtil from '../camera/camera'
import { Direction } from '../grid/Direction/Direction'
import { debugScene } from '../scene/debugScene';

/** LICENSE : Source code is based on Excalibur.js by Erik Onarheim BSD 2-Clause License */

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
  history = ''; // for cheat code
  private _keys: Keys[] = [];
  private _keysUp: Keys[] = [];
  private _keysDown: Keys[] = [];
  private _keysUpQue: Keys[] = [];
  private _cheatCodes = [
    'ilovebanana'     , // 경험치 100만 얻음.-전투 한번당 한번씩만 가능하다.[그 이후에 치면 안먹힘], 한번 적용시키면 해제할 수 없다.
    'richisrich'      , // 돈 100,000을 얻음-한번 적용시킨 후에도 계속 칠 수 있다.
    'givemedrug'      , //  캅셀 치트입니다. -한번 적용시킨 후에도 계속 칠 수 있다.
    'chikichakacho'   , // 모든 기술 습득-한번 적용시키면 해제할 수 없다.
    'timeismoney'     , // 플레이 시간 표시-한번 적용시킨 후에도 계속 칠 수 있다.
    'chikicho'        , // 황금사과 10개 얻음(읽으면 치키쵸)-한번 적용시킨 후에도 계속 칠 수 있다.
    'supersupersuper' , // 전투시 상태이상 완전방어, 무적, 공격력, 방어력 상승-한번 적용시키고난후 다시 치면 해제된다.
    'gundamisgundam'  , // 모빌슈츠, 뉴타입의 증서, 빔실드, 빔샤벨 10개씻 얻음-한번 적용시킨 후에도 계속 칠 수 있다.
    'tututu'          , // 보물상자 얻은 수 표시-한번 적용시키고난후 다시 치면 해제된다.
    'mewmewmew'       , // 든 보온병, 변신 옵션 세트, 변신 풀 세트를 얻음-한번 적용시킨 후에도 계속 칠 수 있다.
    'richaroma'       , // 스컹크의속옷(적들이 나타나지 않음)-한번 적용시킨 후에도 계속 칠 수 있다.
    'killmenow'       , // 몬스터의수 증가-한번 적용시킨 후에도 계속 칠 수 있다.
    'brucelee'        , // 여의 쌍절곤-한번 적용시킨 후에도 계속 칠 수 있다.
    'excalibur'       , // 소닉엣지-한번 적용시킨 후에도 계속 칠 수 있다.
    'ehdqkdqnfvo'     , // 만법공천(쓰기 어려우시면 '동방불패'라고 한번만 타자 쳐보시면 됨)-한번 적용시킨 후에도 계속 칠 수 있다.
    'oinkoinkoink'    , // 핸드캐논-한번 적용시킨 후에도 계속 칠 수 있다.
    'sledgehammer'    , // 쿼트 뽁뽁기-한번 적용시킨 후에도 계속 칠 수 있다.
    'skywalker'       , // 태극검-한번 적용시킨 후에도 계속 칠 수 있다.
    'stevevai'        , // 명인의 기타-한번 적용시킨 후에도 계속 칠 수 있다.
    'williamtell'     , // 인챈트 보우-한번 적용시킨 후에도 계속 칠 수 있다.
    'terminator'      , // 블레이드 라이플-한번 적용시킨 후에도 계속 칠 수 있다.
    'asyourwish'      , // 예스마이 로드-한번 적용시킨 후에도 계속 칠 수 있다.
    'kichmyass'       , // 적이 항상 뒤쪽에서 나타난다(적이 먼저 공격)-한번 적용시키고난후 다시 치면 해제된다.
    'gotcha'          , // 아군이 선제공격을 한다(먼저공격)-한번 적용시키고난후 다시 치면 해제된다.
    'ilovewide'       , // 항상 와이드(wide)로 화면을 본다.(800 600유지)-한번 적용시키고난후 다시 치면 해제된다.
    'ihatewide'       , // 와이드(wide)로 보여지지 않는다(640 480유지)-한번 적용시키고난후 다시 치면 해제된다.
  ]  // min length : 6, max length : 15
  private _cheatMinLength = this._cheatCodes.reduce((previous, current) => previous.length <= current.length ? previous : current).length
  private _cheatMaxLength = this._cheatCodes.reduce((previous, current) => previous.length >= current.length ? previous : current).length

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

        if(this.keyToDirection.has(ev.code as Keys)) {
          ev.stopPropagation();
          ev.preventDefault();
        }

        let code = ev.code as Keys

        /** check for cheat code input */
        if(code === Keys.Enter) {
          if(this.history.length >= this._cheatMinLength) {
            for(let i = 0 ; i <= this._cheatCodes.length ; i++) {
              if(this.history.endsWith(this._cheatCodes[i])) {
                console.log(this._cheatCodes[i] + ' activated')
                debugScene.cheatActivated(0)
                break
              }
            }
          }
          this.history = ''
        } else if (this.history.length !== 0 && ev.key.length !== 1) {
          // clearing history for non alphanumeric key
          this.history = ''
        } else {
          this.history += ev.key
          if(this.history.length > 50) {
            this.history = this.history.substring(30)
          }
        }

        // alias key mapping
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
    this._keysUp.length = 0
    this._keysUpQue.forEach(key => { this._keys.splice(this._keys.indexOf(key), 1) })
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
