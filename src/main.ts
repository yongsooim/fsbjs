import * as rm from './render/render';
import { timerStart }  from './timer/timer';

rm.renderMain()
timerStart()

rm.app.render()

console.log('started')