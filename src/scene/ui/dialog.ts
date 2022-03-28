// 대화창 

import { Actor, Text } from "excalibur";

export enum dialogSpeed {
    pause = 500,
    normal = 70,
    fast = 40
}

export class dialogQuanta{
    arr : Text[]
}

export class DialogBox {

    target : dialogQuanta[]
    showing : Text[]
    speed: number
}