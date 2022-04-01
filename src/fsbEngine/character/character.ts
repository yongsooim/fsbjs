import * as ex from 'excalibur'
import { Direction } from '../type/fsbTypes'

// used in 

declare enum CharacterAction {
  walk = 'walk',
  run = 'run',
}

class fsbCharacter extends ex.Actor {

  spriteSheets : ex.SpriteSheet[]
  faceDirection : Direction
  

}
