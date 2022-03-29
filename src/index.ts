import * as ex from 'excalibur'
import { DevTool } from '@excaliburjs/dev-tools'

import { resources } from './resource/resourceManage'
import { Color } from 'excalibur'
import { loaderLogoBase64 } from './type/const'
import { s000_MainMenu } from './scene/game/s000_mainMenu'

export const game = new ex.Engine({
  width: window.outerWidth,
  height: window.outerHeight,
  antialiasing: false,
  maxFps: 60,
  backgroundColor: Color.Black,
  suppressConsoleBootMessage: true,
  displayMode: ex.DisplayMode.FitScreen
})

game.screen.antialiasing = true

const devtool = new DevTool(game) // dev tools 사용 안하려면 주석처리
devtool.update(devtool) // for avoiding lint

const loader = new ex.Loader(Object.keys(resources).map(key => resources[key]))

loader.backgroundColor = '#000000'
loader.logo = loaderLogoBase64
loader.logoHeight = 64
loader.logoWidth = 64

loader.playButtonText = '시작'

game.start(loader).then(() => {
  game.add('intro', s000_MainMenu)
  game.goToScene('intro')
})

game.onPreUpdate = (game, delta) => {

}
