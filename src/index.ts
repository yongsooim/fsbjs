import * as ex from 'excalibur'
import { DevTool } from '@excaliburjs/dev-tools'

import { resource } from './resource/resourceManage'
import { Color } from 'excalibur'
import { loaderLogoBase64 } from './fsbEngine/type/const'
import { s000_MainMenu } from './scene/game/s000_mainMenu'
import { s999_test } from './scene/global/s999_test'
import { s001_opening } from './scene/cutscene/s001_opening'

export const game = new ex.Engine({
  width: 1280,
  height: 960,
  antialiasing: false,
  maxFps: 60,
  backgroundColor: Color.Black,
  suppressConsoleBootMessage: true,
  displayMode: ex.DisplayMode.FitScreen
})

game.screen.antialiasing = true
game.setAntialiasing(false)
game.screen.applyResolutionAndViewport()

//const devtool = new DevTool(game) // dev tools 사용 안하려면 주석처리

const loader = new ex.Loader(
  [
    resource.pcx('st00'),
    resource.pcx('st01'),
    resource.fx('e156'),
    resource.fx('e154'),
    resource.bgm('pusan'),
    resource.bgm('pusan'),
    resource.ps("cmiro00"),

  ]
)

loader.backgroundColor = '#000000'
loader.logo = loaderLogoBase64
loader.logoHeight = 64
loader.logoWidth = 64

loader.startButtonFactory = () => {
  let buttonElement: HTMLButtonElement = document.getElementById('fsbPlay') as HTMLButtonElement;
  if (!buttonElement) {
    buttonElement = document.createElement('button');
  }

  buttonElement.id = 'fsbPlay';
  buttonElement.textContent = 's';
  return buttonElement;
};


game.start(loader).then(async () => {
  

  //game.add('intro', s000_MainMenu)
  //game.add('intro', s001_opening)
  game.add('intro', s999_test)

  game.goToScene('intro')
})
