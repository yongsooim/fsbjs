import * as ex from 'excalibur'
import { game } from '../../index'
import { resources } from '../../resource/resourceManage'
import { s001_opening } from '../cutscene/s001_opening'

export let s000_mainMenuScene = new ex.Scene()

s000_mainMenuScene.onInitialize = (game) => {
    s000_mainMenuScene.add(introActor)
}

enum hoveredMenu {
    exit, load, start
}

class IntroActor extends ex.Actor {
    constructor(config?: ex.ActorArgs) {
        super(config)
    }
    hovered: hoveredMenu
    stopAnimate: boolean
    static introBackgroundImage = resources.IntroImage.toSprite()
    fadeinRect: ex.Rectangle
}

let introActor = new IntroActor({ x: window.innerWidth / 2, y: window.innerHeight / 2 })


introActor.onInitialize = (game) => {
    introActor.graphics.layers.create({ name: 'background', order: 0 })
    introActor.graphics.layers.create({ name: 'selector', order: 1 })
    introActor.graphics.layers.create({ name: 'fadein', order: 2 }) // white box for fade in
    introActor.graphics.layers.create({ name: 'fadeout', order: 3 }) // white box for fade in
    introActor.fadeinRect = new ex.Rectangle({ width: window.outerWidth, height: window.outerHeight, color: ex.Color.White })

    introActor.graphics.layers.get('background').show(IntroActor.introBackgroundImage)
    introActor.graphics.layers.get('fadein').show(introActor.fadeinRect)

    introActor.hovered = hoveredMenu.load
    introActor.stopAnimate = false

    resources.PusanOgg.play()
    game.input.keyboard.on("press", (evt) => {
        if (evt.value == "Enter") {
            if (!introActor.stopAnimate) {
                introActor.stopAnimate = true

                introActor.graphics.layers.get('selector').hide()

                switch (introActor.hovered) {
                    case (hoveredMenu.exit):
                        introActor.graphics.layers.get('selector').offset = ex.vec(186, 193)
                        introActor.graphics.layers.get('selector').use(new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 0, y: 0, width: 112, height: 51 } }))
                        break;

                    case (hoveredMenu.start):
                        introActor.graphics.layers.get('selector').offset = ex.vec(183, 148)
                        introActor.graphics.layers.get('selector').use(new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 0, y: 51, width: 150, height: 51 } }))
                        break;

                    case (hoveredMenu.load):
                        introActor.graphics.layers.get('selector').offset = ex.vec(182, 101)
                        introActor.graphics.layers.get('selector').use(new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 0, y: 102, width: 128, height: 51 } }))
                        break;
                }
                resources.e154.play()
                resources.PusanOgg.stop()
                game.removeScene(s000_mainMenuScene)
                game.addScene('s001', s001_opening)
                game.goToScene('s001')
            }
        }
    })
}

introActor.update = (game, delta) => {

    introActor.pos = ex.vec(game.drawWidth / 2, game.drawHeight/ 2 )

    if (introActor.fadeinRect.opacity != 0) {
        introActor.fadeinRect.opacity *= 0.9
        if (introActor.fadeinRect.opacity < 0.1) {
            introActor.fadeinRect.opacity = 0
        }
    }

    if (!introActor.stopAnimate) {
        if (game.input.keyboard.wasPressed(ex.Input.Keys.Up)) {
            resources.e156.play()
            switch (introActor.hovered) {
                case hoveredMenu.exit:
                    introActor.hovered = hoveredMenu.start
                    break;
                case hoveredMenu.load:
                    introActor.hovered = hoveredMenu.exit
                    break;
                case hoveredMenu.start:
                    introActor.hovered = hoveredMenu.load
                    break;
            }
        } else if (game.input.keyboard.wasPressed(ex.Input.Keys.Down)) {
            resources.e156.play()
            switch (introActor.hovered) {
                case hoveredMenu.exit:
                    introActor.hovered = hoveredMenu.load
                    break;

                case hoveredMenu.load:
                    introActor.hovered = hoveredMenu.start
                    break;

                case hoveredMenu.start:
                    introActor.hovered = hoveredMenu.exit
                    break;
            }
        }

        switch (introActor.hovered) {

            case (hoveredMenu.load):
                introActor.graphics.layers.get('selector').offset = ex.vec(183, 101)
                introActor.graphics.layers.get('selector').use(loadSelectedAnimation)
                break;
            case (hoveredMenu.start):
                introActor.graphics.layers.get('selector').offset = ex.vec(183, 149)
                introActor.graphics.layers.get('selector').use(startSelectedAnimation)
                break;
            case (hoveredMenu.exit):
                introActor.graphics.layers.get('selector').offset = ex.vec(186, 193)
                introActor.graphics.layers.get('selector').use(exitSelectedAnimation)
                break;
        }
    }
}

const loadSelectedAnimation = new ex.Animation({
    frames: [
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 130, y: 102, width: 128, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 260, y: 102, width: 128, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 390, y: 102, width: 128, height: 51 } }), duration: 100 }
    ],
    strategy: ex.AnimationStrategy.Loop
})
const startSelectedAnimation = new ex.Animation({
    frames: [
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 150, y: 51, width: 150, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 298, y: 51, width: 150, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 446, y: 51, width: 150, height: 51 } }), duration: 100 },
    ],
    strategy: ex.AnimationStrategy.Loop
})

const exitSelectedAnimation = new ex.Animation({
    frames: [
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 112, y: 0, width: 112, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 224, y: 0, width: 112, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 336, y: 0, width: 112, height: 51 } }), duration: 100 }
    ],
    strategy: ex.AnimationStrategy.Loop
})
 