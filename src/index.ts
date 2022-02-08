import * as ex from 'excalibur'
import * as dt from '@excaliburjs/dev-tools'


import runImageSrc from '../assets/img/char/CDIT100.png'
import runImageSrc2 from '../assets/img/char/CSAM00.png'


const game = new ex.Engine({
    width: 800,
    height: 400,
    // Turn off anti-aliasing for pixel art graphics
    antialiasing: false,
    maxFps: 60
})

const devtool = new dt.DevTool(game);


const image = new ex.ImageSource(runImageSrc)
const image2 = new ex.ImageSource(runImageSrc2)

const loader = new ex.Loader([
    /* add Loadables here */
    image,
    image2,
])


const runSheet = ex.SpriteSheet.fromImageSource({
    image: image,
    grid: {
        rows: 4,
        columns: 6,
        spriteWidth: 64,
        spriteHeight: 96
    }
});

const runSheet2 = ex.SpriteSheet.fromImageSource({
    image: image2,
    grid: {
        rows: 4,
        columns: 6,
        spriteWidth: 64,
        spriteHeight: 96
    }
});

const leftfoot = ex.Animation.fromSpriteSheet(runSheet, [6, 7, 8, 7, 6, 9, 10, 9], 66, ex.AnimationStrategy.Loop);
const anim = ex.Animation.fromSpriteSheet(runSheet, [6, 7, 8, 7, 9, 10, 9], 66, ex.AnimationStrategy.Loop);
const anim2 = ex.Animation.fromSpriteSheet(runSheet, [6, 7, 8, 7, 6, 9, 10, 9], 66, ex.AnimationStrategy.Loop);
const anim3 = ex.Animation.fromSpriteSheet(runSheet, [7, 8, 7, 9, 10, 9], 66, ex.AnimationStrategy.Loop);
const anim4 = ex.Animation.fromSpriteSheet(runSheet2, [6, 7, 8, 7, 6, 9, 10, 9], 66, ex.AnimationStrategy.Loop);

const actor = new ex.Actor({
    pos: ex.vec(game.halfDrawWidth, game.halfDrawHeight)
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

actor.graphics.use(leftfoot);
actor2.graphics.use(anim);
actor3.graphics.use(anim2);
actor4.graphics.use(anim3);
actor5.graphics.use(anim4);

game.start(loader).then(() => {

})

game.add(actor)
game.add(actor2)
game.add(actor3)
game.add(actor4)
game.add(actor5)

