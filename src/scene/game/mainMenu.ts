import * as ex from 'excalibur'
import { game } from '../../index'
import { resources } from '../../resource/resourceManage'

export let mainMenuScene = new ex.Scene()

mainMenuScene.onInitialize = (game) => {
    mainMenuScene.add(introActor)
    mainMenuScene.add(jahaActor)
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
let jahaActor = new IntroActor({ x: window.innerWidth / 2, y: window.innerHeight / 2 + 100 })

const jahaAnim = new ex.Animation({
    frames: [
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 26, y: 12, width: 38, height: 34 },      }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 75, y: 14, width: 115, height: 70 },     }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 194, y: 12, width: 187, height: 130 },   }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 393, y: 13, width: 258, height: 225 },   }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 660, y: 7, width: 278, height: 291 },    }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 951, y: 10, width: 284, height: 380 },   }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 1255, y: 3, width: 273, height: 445 },   }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 86, y: 157, width: 298, height: 507 },   }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 386, y: 316, width: 312, height: 512 },  }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 737, y: 412, width: 280, height: 514 },  }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 1030, y: 448, width: 340, height: 480 }, }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 3, y: 684, width: 374, height: 421 },    }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 384, y: 844, width: 348, height: 340 },  }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 749, y: 940, width: 368, height: 244 },  }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 1124, y: 928, width: 276, height: 209 }, }), duration: 66 },
        { graphic: new ex.Sprite({ image: resources.JahaE, sourceView: { x: 1381, y: 828, width: 187, height: 100 }, }), duration: 66 },
    ],
    strategy: ex.AnimationStrategy.Loop
})

jahaActor.onInitialize = (game) => {
    jahaActor.z = 5
    jahaActor.graphics.show(jahaAnim)

}



introActor.onInitialize = (game) => {


    introActor.graphics.layers.create({ name: 'background', order: 0 })
    introActor.graphics.layers.create({ name: 'selector', order: 1 })
    introActor.graphics.layers.create({ name: 'fadein', order: 2 }) // white box for fade in
    introActor.graphics.layers.create({ name: 'fadeout', order: 3 }) // white box for fade in
    introActor.fadeinRect = new ex.Rectangle({ width: window.outerWidth, height: window.outerHeight, color: ex.Color.White })

    //introActor.graphics.layers.get('background').show(IntroActor.introBackgroundImage)
    //introActor.graphics.layers.get('fadein').show(introActor.fadeinRect)

    introActor.hovered = hoveredMenu.load
    introActor.stopAnimate = false

    //resources.PusanOgg.play()
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
            }
        }

    })
}

let counter = 0
let offsetXArr = [22,      53,      94,      135,     124,     153,     137,     138,     158,     127,     154,     189,     176,     179,     92,      83,  ]
let offsetYArr = [19 ,    49 ,    107,    210,    264,    341,    404,    482,    491,    483,    495,    491,    483,    483,    495,    483]

jahaActor.graphics.onPreDraw = (game, delta) => {
    jahaActor.graphics.anchor = ex.vec(0, 0)
    jahaActor.graphics.offset = ex.vec(-offsetXArr[jahaAnim.currentFrameIndex], -offsetYArr[jahaAnim.currentFrameIndex])
}

introActor.update = (game, delta) => {
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
                introActor.graphics.layers.get('selector').hide()
                introActor.graphics.layers.get('selector').offset = ex.vec(183, 101)
//                introActor.graphics.layers.get('selector').show(introLoadSelectedAnim)
                break;
            case (hoveredMenu.start):
                introActor.graphics.layers.get('selector').hide()
                introActor.graphics.layers.get('selector').offset = ex.vec(183, 149)
  //              introActor.graphics.layers.get('selector').show(introStartSelectedAnim)
                break;
            case (hoveredMenu.exit):
                introActor.graphics.layers.get('selector').hide()
                introActor.graphics.layers.get('selector').offset = ex.vec(186, 193)
    //            introActor.graphics.layers.get('selector').show(introExitSelectedAnim)
                break;
        }
    }
}

const introLoadSelectedAnim = new ex.Animation({
    frames: [
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 130, y: 102, width: 128, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 260, y: 102, width: 128, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 390, y: 102, width: 128, height: 51 } }), duration: 100 }
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

const introExitSelectedAnim = new ex.Animation({
    frames: [
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 112, y: 0, width: 112, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 224, y: 0, width: 112, height: 51 } }), duration: 100 },
        { graphic: new ex.Sprite({ image: resources.IntroSelector, sourceView: { x: 336, y: 0, width: 112, height: 51 } }), duration: 100 }
    ],
    strategy: ex.AnimationStrategy.Loop
})
