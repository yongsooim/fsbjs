import { ImageSource, Sound } from "excalibur";
import { FsbMapResource } from "../types/fsbTypes";
import { assetRootPath } from "../types/const";


export let resources = {
    IntroImage: new ImageSource(assetRootPath + "graphics/img/ST00.png"),
    IntroSelector: new ImageSource(assetRootPath + "graphics/img/ST01.png"),
    Image2: new ImageSource(assetRootPath + "graphics/actor/csam/CSAM00.png"),

    Map: new FsbMapResource(assetRootPath + 'map/tmj/ff.tmj'),

    PusanOgg: new Sound(assetRootPath + "ogg/bgm/pusan.ogg"),
    e154: new Sound(assetRootPath + 'ogg/fx/e154.ogg'),
    e156: new Sound(assetRootPath + 'ogg/fx/e156.ogg'),
};
