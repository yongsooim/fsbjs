import * as ex from 'excalibur'
import { Player, image2 } from './actor/player'
import { DevTool } from '@excaliburjs/dev-tools'
import { TiledMapResource } from '@excaliburjs/plugin-tiled';

import runImageSrc from '/static/graphics/actor/cdit/CDIT100.png'
import runImageSrc2 from '/static/graphics/actor/csam/CSAM00.png'
import myTmx from '/static/map/tmj/ff.tmj';
import {resources} from './resource/resource'


import { Color } from 'excalibur';

const game = new ex.Engine({
    width: window.outerWidth,
    height: window.outerHeight,
    // Turn off anti-aliasing for pixel art graphics
    antialiasing: false,
    maxFps: 60,
    backgroundColor: Color.Black,
    suppressConsoleBootMessage: true,
    displayMode: ex.DisplayMode.FitScreen,
})





const devtool = new DevTool(game);
document.getElementsByClassName("excalibur-tweakpane-custom")[0].setAttribute("style", "bottom:10px")
document.getElementsByClassName("excalibur-tweakpane-custom")[0].removeAttribute("bottom")


const image = new ex.ImageSource(runImageSrc)
export const map = new TiledMapResource(myTmx, { startingLayerZIndex: -2 });
const loader = new ex.Loader([
    map,
    image,
    image2,
    resources.IntroImage,
    resources.PusanOgg
]);
loader.backgroundColor = '#000000'

loader.logo =  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAALVBMVEUAAADMAAD/AAD/ZjP//8z//5mZmWZmZjMICAjMzJlmZgD/zADMmQAzMzP///8DKeQuAAAAAWJLR0QOb70wTwAAAAd0SU1FB+YCDQAOLsY2+cMAAAEhSURBVCjPVVIxUsMwEJQzJmkdDQ9AZwZ66wMp7CK9VbiDFHKVGYYm9gsQITWDfpCCF5APMNCEB+QvnHSSAjejkXZ1Wp1uxVgMDgAFm0eYAUgJgouEJfi4OmNRuLQinJeVKPxGSCglkJr4k7BwqyDhFPLWrYrziUa1qaRJWcGlUqpORSHRKBcLFjWuFUUbn9Grf0x2Y0bCtfXEdDD7kbAmvN0evsaE8zfzsvv4NmPETTfsDp/GPNv+6AisoBve9+bJ9idHXDixbkC8ul0/IEHXdcO4ArFhiVDLVwjtonqW9r4MRF47aO/m+ELqhsXQ+sjLKvRvqrWenX5ARoLjmK0fsWvBAj9vohGMzMkgGcEmZKF3jiQEx+0qYfQ/w48g0jf4BWezWSBoSsEXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTAyLTEzVDAwOjE0OjQ2KzAwOjAw1+mSSAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wMi0xM1QwMDoxNDo0NiswMDowMKa0KvQAAAAASUVORK5CYII=';
loader.logoWidth = 32;
loader.logoHeight = 32;
loader.playButtonText = '클릭하여 시작하기'


const runSheet = ex.SpriteSheet.fromImageSource({
    image: image,
    grid: {
        rows: 4,
        columns: 6,
        spriteWidth: 64,
        spriteHeight: 96
    }
});


const anim = ex.Animation.fromSpriteSheet(runSheet, [6, 7, 8, 7, 9, 10, 9], 66, ex.AnimationStrategy.Loop);
const anim2 = ex.Animation.fromSpriteSheet(runSheet, [6, 7, 8, 7, 6, 9, 10, 9], 66, ex.AnimationStrategy.Loop);
const anim3 = ex.Animation.fromSpriteSheet(runSheet, [7, 8, 7, 9, 10, 9], 66, ex.AnimationStrategy.Loop);

const actor = new Player({
    pos: ex.vec(640, 960)
});

const actor2 = new ex.Actor({
    pos: ex.vec(100, 100)
});


const actor3 = new ex.Actor({
    pos: ex.vec(200, 100)
});


const actor4 = new ex.Actor({
    pos: ex.vec(300, 100)
});


const actor5 = new ex.Actor({
    pos: ex.vec(400, 100)
});

actor2.graphics.use(anim);
actor3.graphics.use(anim2);
actor4.graphics.use(anim3);

game.start(loader).then(() => {


    resources.PusanOgg.play()


    console.log(map)
    map.addTiledMapToScene(game.currentScene)
    actor.z = 1;
    cameraSet()

})


var zoomSmoother
var targetZoom

function cameraSet() {
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
        map.data.height * 96,
        map.data.width * 64
    )
    game.currentScene.camera.strategy.limitCameraBounds(boundingBox)


}

function keyboardSet() {

}

function actorSet() {

}

game.add(actor)
game.add(actor2)
game.add(actor3)