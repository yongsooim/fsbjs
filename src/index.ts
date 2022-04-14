import { Engine, DisplayMode, Loader, vec, Color } from 'excalibur'
import { DevTool } from '@excaliburjs/dev-tools'

import { resource } from './resource/ResourceManage'

import { loaderLogoBase64 } from './fsbEngine/type/const'
import { s000_MainMenu } from './scene/game/s000_mainMenu'
import { s999_test } from './scene/global/s999_test'
import { s001_opening } from './scene/cutscene/s001_opening'

export const game = new Engine({
  width: 1280,
  height: 960,
  antialiasing: false,
  maxFps: 60,
  backgroundColor: Color.Black,
  suppressConsoleBootMessage: true,
  displayMode: DisplayMode.FitScreen
})

game.screen.antialiasing = true
game.setAntialiasing(false)
game.screen.applyResolutionAndViewport()

const loader = new Loader(
  [
    resource.pcx('st00'),
    resource.pcx('st01'),
    resource.fx('e156'),
    resource.fx('e154'),
    resource.bgm('pusan'),
    resource.ps('cmiro00'),
    resource.ps('cson000'),
    resource.ps('cdit000'),
    resource.ps('cjah000'),
    resource.ps('csam00'),
    resource.ps('csona00'),
    resource.ps('cmiro00'),
    resource.ps('cjupa00'),
    resource.ps('cpusa00'),
    resource.ps('csao00'),
    resource.ps('cpao00'),
    resource.pcx('shadow'),
    resource.map('0130_tdi0___'),
    resource.map('0476_tbb0___'),
    resource.bgm('pao')
  ]
)

loader.backgroundColor = '#000000'
 loader.logo = loaderLogoBase64
/** white dot */
//loader.logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjiJu+4D8ABYEClcC+vtcAAAAASUVORK5CYII='
loader.logoPosition = vec(game.screen.viewport.width * 45 / 100, game.screen.viewport.height * 2 / 5)
loader.loadingBarPosition = vec(game.screen.viewport.width / 4, game.screen.viewport.height * 4 / 5)
loader.logoWidth = game.screen.viewport.width / 2

loader.startButtonFactory = () => {
  game.screen.applyResolutionAndViewport()
  let buttonElement: HTMLButtonElement = document.getElementById('fsbPlay') as HTMLButtonElement
  if (!buttonElement) {
    buttonElement = document.createElement('button')
  }

  buttonElement.id = 'fsbPlay'
  buttonElement.textContent = '시작'
  //buttonElement.textContent = 's'
  return buttonElement
}

game.start(loader).then(async () => {
//  resource.map('0130_tdi0___').addTiledMapToScene(game.currentScene)
  resource.map('0476_tbb0___').addTiledMapToScene(game.currentScene)

  // game.add('intro', s000_MainMenu)
  // game.add('intro', s001_opening)
  game.add('intro', s999_test)
  
  const devtool = new DevTool(game) // dev tools 사용 안하려면 주석처리

  game.goToScene('intro')
})
