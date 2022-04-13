import { Actor, SpriteSheet } from 'excalibur'
import { Direction } from '../type/fsbTypes'

// used in

declare enum CharacterAction {
  walk = 'walk',
  run = 'run',
}

class fsbCharacter extends Actor {
  spriteSheets: SpriteSheet[]
  faceDirection: Direction
}
