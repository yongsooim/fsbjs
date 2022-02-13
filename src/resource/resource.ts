import { ImageSource, Sound } from "excalibur";

import introImage from "/static/graphics/img/ST00.png"
import pusanOgg from "/static/ogg/bgm/pusan.ogg"



export let resources = {
    IntroImage: new ImageSource(introImage),
    PusanOgg: new Sound(pusanOgg)
};
