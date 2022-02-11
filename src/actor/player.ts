import * as ex from 'excalibur'
import * as fsb from '../types/fsbTypes';
import runImageSrc2 from '../../static/graphics/actor/csam/CSAM00.png'
import { map } from '../index'

export const image2 = new ex.ImageSource(runImageSrc2)

const runSheet2 = ex.SpriteSheet.fromImageSource({
    image: image2,
    grid: {
        rows: 4,
        columns: 6,
        spriteWidth: 64,
        spriteHeight: 96
    }
});


const anim4 = ex.Animation.fromSpriteSheet(runSheet2, [6, 7, 8, 7, 6, 9, 10, 9], 66, ex.AnimationStrategy.Loop);



export class Player extends ex.Actor {

    public isMoving: boolean;
    public position: fsb.Coordinate;
    public direction: fsb.Direction;

    constructor(config?: ex.ActorArgs) {
        super(config)
        this.direction = fsb.Direction.DOWN;

        this.graphics.add('walkup', ex.Animation.fromSpriteSheet(runSheet2, [0, 1, 2, 1, 0, 3, 4, 3], 33, ex.AnimationStrategy.Loop))
        this.graphics.add('walkdown', ex.Animation.fromSpriteSheet(runSheet2, [6, 7, 8, 7, 6, 9, 10, 9], 33, ex.AnimationStrategy.Loop))
        this.graphics.add('walkright', ex.Animation.fromSpriteSheet(runSheet2, [18, 19, 20, 19, 18, 21, 22, 18], 33, ex.AnimationStrategy.Loop))
        this.graphics.add('walkleft', ex.Animation.fromSpriteSheet(runSheet2, [12, 13, 14, 13, 12, 15, 16, 15], 33, ex.AnimationStrategy.Loop))

        this.graphics.add('stopup', ex.Animation.fromSpriteSheet(runSheet2, [0], 33, ex.AnimationStrategy.Loop))
        this.graphics.add('stopdown', ex.Animation.fromSpriteSheet(runSheet2, [6], 33, ex.AnimationStrategy.Loop))
        this.graphics.add('stopright', ex.Animation.fromSpriteSheet(runSheet2, [18], 33, ex.AnimationStrategy.Loop))
        this.graphics.add('stopleft', ex.Animation.fromSpriteSheet(runSheet2, [12], 33, ex.AnimationStrategy.Loop))
        this.graphics.use('stopdown');


    }
    public update(engine: ex.Engine, delta: number) {


        if (this.isMoving) {
            switch (this.direction) {
                case fsb.Direction.UP:
                    this.pos.y = this.pos.y - 8;
                    break

                case fsb.Direction.LEFT:
                    this.pos.x = this.pos.x - 8;
                    break

                case fsb.Direction.RIGHT:
                    this.pos.x = this.pos.x + 8;
                    break

                case fsb.Direction.DOWN:
                    this.pos.y = this.pos.y + 8;
                    break

            }

            console.log(engine.input.keyboard.isHeld(ex.Input.Keys.W))
            if (this.pos.x % 64 == 0 && this.pos.y % 48 == 0

                && !engine.input.keyboard.isHeld(ex.Input.Keys.W)
                && !engine.input.keyboard.isHeld(ex.Input.Keys.A)
                && !engine.input.keyboard.isHeld(ex.Input.Keys.S)
                && !engine.input.keyboard.isHeld(ex.Input.Keys.D)
                && !engine.input.keyboard.isHeld(ex.Input.Keys.Up)
                && !engine.input.keyboard.isHeld(ex.Input.Keys.Down)
                && !engine.input.keyboard.isHeld(ex.Input.Keys.Left)
                && !engine.input.keyboard.isHeld(ex.Input.Keys.Right)
            ) {


                this.isMoving = false

                switch (this.direction) {
                    case fsb.Direction.UP:
                        this.graphics.use('stopup');
                        break

                    case fsb.Direction.DOWN:
                        this.graphics.use('stopdown');

                        break

                    case fsb.Direction.LEFT:
                        this.graphics.use('stopleft');

                        break

                    case fsb.Direction.RIGHT:
                        this.graphics.use('stopright');

                        break
                }

            }
        } else {

            if (engine.input.keyboard.isHeld(ex.Input.Keys.W) ||
                engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
                this.isMoving = true;
                this.graphics.use('walkup');
                this.direction = fsb.Direction.UP

            } else if (engine.input.keyboard.isHeld(ex.Input.Keys.A) ||
                engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
                this.isMoving = true;
                this.graphics.use('walkleft');
                this.direction = fsb.Direction.LEFT


            } else if (engine.input.keyboard.isHeld(ex.Input.Keys.S) ||
                engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
                this.isMoving = true;
                this.graphics.use('walkdown');
                this.direction = fsb.Direction.DOWN


            } else if (engine.input.keyboard.isHeld(ex.Input.Keys.D) ||
                engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
                this.isMoving = true;
                this.graphics.use('walkright');
                this.direction = fsb.Direction.RIGHT


            }
        }
    }

}
