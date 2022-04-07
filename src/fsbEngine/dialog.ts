// 대화창

import * as ex from 'excalibur'


export enum DialogSpeed {
    pause = 500,
    normal = 70,
    fast = 40
}

enum DialogState{
    showing,
    done
}

class e {

}

export class DialogBox extends ex.Actor {
    state : DialogState
    target : ex.Text[]
    cursor : number
    speed = DialogSpeed.normal 

    show (elapsed:number) {

    }

    update(game:ex.Engine, delta:number){
        super.update(game, delta)

    }

    collapse(){

    }

    expand(){
        
    }
}
