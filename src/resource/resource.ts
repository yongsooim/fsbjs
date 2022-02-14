import { ImageSource, Sound } from "excalibur";
import { FsbMapResource } from "../types/fsbTypes";
import { assetRootPath } from "../types/const";


export let resources = {
    IntroImage: new ImageSource(assetRootPath + "graphics/img/ST00.png"),
    PusanOgg: new Sound(assetRootPath + "ogg/bgm/pusan.ogg"),
    Map: new FsbMapResource(assetRootPath + 'map/tmj/ff.tmj')

};
