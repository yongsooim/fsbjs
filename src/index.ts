import * as ex from 'excalibur'
import { Player } from './actor/player'
import { DevTool } from '@excaliburjs/dev-tools'
import { FsbMapResource } from './types/fsbTypes';

import {resources} from './resource/resourceManage'
import { Color } from 'excalibur';
import { introActor } from './scene/001_opening';

export const game = new ex.Engine({
    width: window.outerWidth,
    height: window.outerHeight,
    antialiasing: false,
    maxFps: 60,
    backgroundColor: Color.Black,
    suppressConsoleBootMessage: true,
    displayMode: ex.DisplayMode.FitScreen,
})

game.screen.antialiasing = true


//const devtool = new DevTool(game);

const loader = new ex.Loader(Object.keys(resources).map(key => resources[key]));
loader.backgroundColor = '#000000'

loader.logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAALVBMVEUAAADMAAD/AAD/ZjP//8z//5mZmWZmZjMICAjMzJlmZgD/zADMmQAzMzP///8DKeQuAAAAAWJLR0QOb70wTwAAAAd0SU1FB+YCDQAOLsY2+cMAAAEhSURBVCjPVVIxUsMwEJQzJmkdDQ9AZwZ66wMp7CK9VbiDFHKVGYYm9gsQITWDfpCCF5APMNCEB+QvnHSSAjejkXZ1Wp1uxVgMDgAFm0eYAUgJgouEJfi4OmNRuLQinJeVKPxGSCglkJr4k7BwqyDhFPLWrYrziUa1qaRJWcGlUqpORSHRKBcLFjWuFUUbn9Grf0x2Y0bCtfXEdDD7kbAmvN0evsaE8zfzsvv4NmPETTfsDp/GPNv+6AisoBve9+bJ9idHXDixbkC8ul0/IEHXdcO4ArFhiVDLVwjtonqW9r4MRF47aO/m+ELqhsXQ+sjLKvRvqrWenX5ARoLjmK0fsWvBAj9vohGMzMkgGcEmZKF3jiQEx+0qYfQ/w48g0jf4BWezWSBoSsEXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTAyLTEzVDAwOjE0OjQ2KzAwOjAw1+mSSAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wMi0xM1QwMDoxNDo0NiswMDowMKa0KvQAAAAASUVORK5CYII=';
loader.logoWidth = 32;
loader.logoHeight = 32;
loader.playButtonText = '시작'
loader.suppressPlayButton = true

export const actor = new Player({
    pos: ex.vec(640 + 32, 960)
})

game.start(loader).then(() => {

    resources.PusanOgg.loop = true
    resources.PusanOgg.play()

    game.add(introActor)

    introActor.pos = ex.vec(game.halfDrawWidth, game.halfDrawHeight)
    
  
 

})


export function cameraSet() {
    game.currentScene.camera.zoom = 2
    game.input.pointers.on('wheel', function (evt) {
        if (evt.deltaY > 0) {
            if (game.currentScene.camera.zoom > 0.5) {
                game.currentScene.camera.zoom *= 0.9;
            }
        } else {
            if (game.currentScene.camera.zoom < 4) {
                game.currentScene.camera.zoom *= 1.1;
            }
        }
    })

    game.currentScene.camera.strategy.elasticToActor(
        actor,
        0.9,
        0.8
    )

    let boundingBox = new ex.BoundingBox(
        0,
        0,
        resources.Map.data.height * 96,
        resources.Map.data.width * 64
    )
    game.currentScene.camera.strategy.limitCameraBounds(boundingBox)
}
