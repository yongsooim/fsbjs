import { resources } from '../resource/resourceManage'
import * as ex from 'excalibur'
import {game} from '../index'
import {scenes} from './sceneManage'
import {actor, cameraSet} from '../index'

export const introScene = new ex.Scene()

declare enum selected {
    start,
    load,
    exit
}

class IntroActor extends ex.Actor{
    public selected = selected.load

}

export let introActor = new IntroActor()
let introSprite = resources.IntroImage.toSprite()

const introExitSelectedAnim = new ex.Animation({
    frames: [
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 112, y: 0, width: 112, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 224, y: 0, width: 112, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 334, y: 0, width: 112, height: 51 } }), duration: 100 }
    ],
    strategy: ex.AnimationStrategy.Loop
})

const introStartSelectedAnim = new ex.Animation({
    frames: [
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 150, y: 51, width: 150, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 298, y: 51, width: 150, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 446, y: 51, width: 150, height: 51 } }), duration: 100 },
    ],
    strategy: ex.AnimationStrategy.Loop
})

const introLoadSelectedAnim = new ex.Animation({
    frames: [
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 128, y: 102, width: 128, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 256, y: 102, width: 128, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 384, y: 102, width: 128, height: 51 } }), duration: 100 }
    ],
    strategy: ex.AnimationStrategy.Loop
})

introActor.graphics.layers.create({ name: 'background', order: 0 })
introActor.graphics.layers.create({ name: 'selector', order: 1})
introActor.graphics.layers.create({ name: 'fadein', order: 2 }) // white box for fade in

console.log(introActor.graphics.layers)

introActor.graphics.layers.get('background').show(introSprite)

let fadeinRect = new ex.Rectangle({width:window.outerWidth, height:window.outerHeight, color: ex.Color.White})
introActor.graphics.layers.get('fadein').show(fadeinRect)

introActor.onInitialize = (game) => {

    game.input.keyboard.on("press", (evt)=>{
        if(evt.value == "Enter") {
            switch(introActor.selected){
                case (selected.exit) : 
                    introActor.graphics.layers.get('selector').hide()
                    introActor.graphics.layers.get('selector').offset = ex.vec(186, 193)
                    introActor.graphics.layers.get('selector').show(new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 0, y: 0, width: 112, height: 51 } }))
                    break;
        
                case (selected.start) : 
                    introActor.graphics.layers.get('selector').hide()
                    introActor.graphics.layers.get('selector').offset = ex.vec(183, 148)
                    introActor.graphics.layers.get('selector').show(new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 0, y: 51, width: 150, height: 51 } }))
                    break;
        
                case (selected.load) : 
                    introActor.graphics.layers.get('selector').hide()
                    introActor.graphics.layers.get('selector').offset = ex.vec(179, 101)
                    introActor.graphics.layers.get('selector').show(new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 0, y: 102, width: 128, height: 51 } }))
                    break;
            }

            resources.e154.play()
            
            setTimeout(()=>{
                resources.PusanOgg.stop()
                introActor.kill()
    
                resources.vill2.loop = true
                resources.vill2.play()
                resources.Map.addTiledMapToScene(game.currentScene)
                game.add(actor)
                actor.z = 5;
                cameraSet()
    

            }, 500)
        }

    })
} 


let count = 0
introActor.update = (game, delta) => {

    if(fadeinRect.opacity){
        fadeinRect.opacity *= 0.9
        if(fadeinRect.opacity < 0.1){
            fadeinRect.opacity = 0
        }
        console.log(count++)
    }

    if (game.input.keyboard.wasPressed(ex.Input.Keys.Down)) {
        resources.e156.play()
        switch(introActor.selected){
            case selected.exit:
                introActor.selected = selected.load
                break;

            case selected.load:
                introActor.selected = selected.start
                break;

            case selected.start:
                introActor.selected = selected.exit
                break;
        }

    } else if (game.input.keyboard.wasPressed(ex.Input.Keys.Up)) {
        resources.e156.play()
        switch(introActor.selected){
            case selected.exit:
                introActor.selected = selected.start
                break;

            case selected.load:
                introActor.selected = selected.exit
                break;

            case selected.start:
                introActor.selected = selected.load
                break;
        }
    }

    switch(introActor.selected){
        case (selected.exit) : 
            introActor.graphics.layers.get('selector').hide()
            introActor.graphics.layers.get('selector').offset = ex.vec(186, 193)
            introActor.graphics.layers.get('selector').show(introExitSelectedAnim)
            break;

        case (selected.start) : 
            introActor.graphics.layers.get('selector').hide()
            introActor.graphics.layers.get('selector').offset = ex.vec(183, 148)
            introActor.graphics.layers.get('selector').show(introStartSelectedAnim)
            break;

        case (selected.load) : 
            introActor.graphics.layers.get('selector').hide()
            introActor.graphics.layers.get('selector').offset = ex.vec(179, 101)
            introActor.graphics.layers.get('selector').show(introLoadSelectedAnim)
            break;
    }
}