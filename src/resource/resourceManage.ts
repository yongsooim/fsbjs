import { ImageSource, Sound } from "excalibur";
import { FsbMapResource } from "../types/fsbTypes";
import { assetRootPath } from "../types/const";


export let resources = {
    IntroImage   : new ImageSource   (assetRootPath + "graphics/img/ST00.png"         ),
    IntroSelector: new ImageSource   (assetRootPath + "graphics/img/ST01.png"         ),
    Image2       : new ImageSource   (assetRootPath + "graphics/actor/csam/CSAM00.png"),

    Map          : new FsbMapResource(assetRootPath + 'map/tmj/ff.tmj'                ),  // 다섯손가락 마을 테스트용

    PusanOgg     : new Sound         (assetRootPath + "ogg/bgm/pusan.ogg"             ),  // 푸산 테마, 게임 스타트/로딩/엑싯 화면 브금
    e154         : new Sound         (assetRootPath + 'ogg/fx/e154.ogg'               ),  // 메뉴에서 항목 골랐을 때 나는 소리
    e156         : new Sound         (assetRootPath + 'ogg/fx/e156.ogg'               ),  // 메뉴 커서 옮길 때 나는 소리
};
