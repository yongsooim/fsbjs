import * as ex from 'excalibur'
import { Player } from './actor/player'
import { DevTool } from '@excaliburjs/dev-tools'
import { FsbMapResource } from './types/fsbTypes';
import { assetRootPath } from './types/const';
import {mapList} from './resource/mapList'

import {resources} from './resource/resourceManage'
import { Color } from 'excalibur';
import { introActor } from './scene/001_opening';

export const game = new ex.Engine({
    canvasElementId: 'game',
    antialiasing: false,
    maxFps: 60,
    backgroundColor: Color.Black,
    suppressConsoleBootMessage: true,
    displayMode: ex.DisplayMode.FitScreen,
    suppressPlayButton: false
})
game.screen.antialiasing = true

const devtool = new DevTool(game);

const loader = new ex.Loader(Object.keys(resources).map(key => resources[key]));
export let map = new FsbMapResource(assetRootPath + 'mapset/tmj/' + mapList[22])
loader.addResource(map)
loader.backgroundColor = '#000000'

loader.logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAALVBMVEUAAADMAAD/AAD/ZjP//8z//5mZmWZmZjMICAjMzJlmZgD/zADMmQAzMzP///8DKeQuAAAAAWJLR0QOb70wTwAAAAd0SU1FB+YCDQAOLsY2+cMAAAEhSURBVCjPVVIxUsMwEJQzJmkdDQ9AZwZ66wMp7CK9VbiDFHKVGYYm9gsQITWDfpCCF5APMNCEB+QvnHSSAjejkXZ1Wp1uxVgMDgAFm0eYAUgJgouEJfi4OmNRuLQinJeVKPxGSCglkJr4k7BwqyDhFPLWrYrziUa1qaRJWcGlUqpORSHRKBcLFjWuFUUbn9Grf0x2Y0bCtfXEdDD7kbAmvN0evsaE8zfzsvv4NmPETTfsDp/GPNv+6AisoBve9+bJ9idHXDixbkC8ul0/IEHXdcO4ArFhiVDLVwjtonqW9r4MRF47aO/m+ELqhsXQ+sjLKvRvqrWenX5ARoLjmK0fsWvBAj9vohGMzMkgGcEmZKF3jiQEx+0qYfQ/w48g0jf4BWezWSBoSsEXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTAyLTEzVDAwOjE0OjQ2KzAwOjAw1+mSSAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wMi0xM1QwMDoxNDo0NiswMDowMKa0KvQAAAAASUVORK5CYII=';
loader.logoWidth = 32;
loader.logoHeight = 32;
loader.playButtonText = '시작'

const startIntro = () => {




    game.start(loader).then(() => {

        game.add(introActor)
        introActor.pos = ex.vec(game.halfDrawWidth, game.halfDrawHeight)
    

    })
}



const reset = () => {
    game.currentScene.camera.clearAllStrategies();
    game.currentScene.tileMaps.forEach(t => {
       game.currentScene.remove(t);
    });
    game.currentScene.actors.forEach(a => {
       game.currentScene.remove(a);
    });
 }
 
 const start = (mapFile: string) => {

    const loader = new ex.Loader(Object.keys(resources).map(key => resources[key]));
    loader.suppressPlayButton = true

    console.log(mapFile)
    let map = new FsbMapResource(mapFile)
    loader.addResource(map)
    let player = new Player({x:32 + 64, y:96})
    game.add(player)
    game.start(loader).then(() => {

        console.log(map.getTileMapLayers()[0])
        console.log(map.getTileMapLayers()[1])
        map.addTiledMapToScene(game.currentScene)


        game.currentScene.camera.zoom = 1
        game.input.pointers.on('wheel', function (evt) {
            if (evt.deltaY > 0) {
                if (game.currentScene.camera.zoom > 0.4) {
                    game.currentScene.camera.zoom *= 0.9;
                }
            } else {
                if (game.currentScene.camera.zoom < 4) {
                    game.currentScene.camera.zoom *= 1.1;
                }
            }
        })
        
        let boundingBox = new ex.BoundingBox(
            0,
            0,
            game.currentScene.tileMaps[0].cols * 64,
            game.currentScene.tileMaps[0].rows * 48,
        )
//        game.currentScene.camera.strategy.elasticToActor(player, 0.9, 0.8)
game.currentScene.camera.strategy.lockToActor(player)
        game.currentScene.camera.strategy.limitCameraBounds(boundingBox)
    })   
}



var mapClicked = function() {
    //resources.vill2.stop()
    resources.PusanOgg.stop()
    game.currentScene.tileMaps.forEach(t => {
        game.currentScene.remove(t);
     });

    loader.suppressPlayButton = true

    reset();
    start(assetRootPath + 'mapset/tmj/' + mapList[parseInt(this.innerText.slice(0,4))]);
 }

var elements = document.getElementsByClassName("mapSelector");

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', mapClicked);
}

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

startIntro()
