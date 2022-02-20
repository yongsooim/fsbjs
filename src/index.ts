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
    suppressPlayButton: true
})
game.screen.antialiasing = true

const devtool = new DevTool(game);

const loader = new ex.Loader(Object.keys(resources).map(key => resources[key]));
export let map = new FsbMapResource(assetRootPath + 'mapset/tmj/' + mapList[22])
loader.addResource(map)

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
