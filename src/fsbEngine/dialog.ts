// 대화창

import { Engine, Actor, Text } from 'excalibur'

export enum DialogSpeed {
    pause = 500,
    normal = 70,
    fast = 40
}

enum DialogState {
    showing,
    done
}

class e {

}

export class DialogBox extends Actor {
    state: DialogState
    target: Text[]
    cursor: number
    speed = DialogSpeed.normal

    show (elapsed: number) {

    }

    update (game: Engine, delta: number) {
      super.update(game, delta)
    }

    collapse () {

    }

    expand () {

    }
}
