// 대화창

import { Actor, Text } from 'excalibur'

export enum DialogSpeed {
    pause = 500,
    normal = 70,
    fast = 40
}

enum DialogState{
    showing,
    done
}

export class DialogBox extends Actor {
    state : DialogState// 상태
    target : Text[] // 최종적으로 보여질 텍스트
    cursor : number // 커서 위치
    speed = DialogSpeed.normal // 글자 표시 속도

    show (elapsed:number) {

    }
}
