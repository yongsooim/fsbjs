import { Direction } from "./../../Direction/Direction";
import { FrameRow } from "./../GridCharacter";
import { WalkingAnimationMapping } from "../../GridEngine";

export class CharacterAnimation {
  private static readonly FRAMES_CHAR_ROW = 6;
  private static readonly FRAMES_CHAR_COL = 4;
  private lastFootLeft = false;
  private directionToFrameRow: { [key in Direction]?: number } = {
    [Direction.UP]: 0,
    [Direction.DOWN]: 1,
    [Direction.LEFT]: 2,
    [Direction.RIGHT]: 3,
    [Direction.DOWN_LEFT]: 1,
    [Direction.DOWN_RIGHT]: 3,
    [Direction.UP_LEFT]: 2,
    [Direction.UP_RIGHT]: 3,
  };
  private _isEnabled = true;
  private directioinChangingFrame = new Map([
    [Direction.LEFT, new Map([
      [Direction.UP, [17, 17, 17]],
      [Direction.RIGHT, [11, 6, 23]],
      [Direction.DOWN, [11, 11, 11]]
    ])],
    [Direction.RIGHT, new Map([
      [Direction.UP, [5, 5, 5]],
      [Direction.LEFT, [5, 0, 17]],
      [Direction.DOWN, [23, 23, 23]]
    ])],
    [Direction.DOWN, new Map([
      [Direction.UP, [23, 18, 5]],
      [Direction.RIGHT, [23, 23, 23]],
      [Direction.LEFT, [11, 11, 11]]
    ])],
    [Direction.UP, new Map([
      [Direction.LEFT, [17, 17, 17]],
      [Direction.RIGHT, [5, 5, 5]],
      [Direction.DOWN, [17, 12, 11]]
    ])],
  ])

  constructor(
    private sprite: Phaser.GameObjects.Sprite,
    private walkingAnimationMapping: WalkingAnimationMapping | undefined,
    private characterIndex: number
  ) {}

  setIsEnabled(isEnabled: boolean): void {
    this._isEnabled = isEnabled;
  }

  isEnabled(): boolean {
    return this._isEnabled;
  }

  updateCharacterFrame( movementDirection: Direction, hasWalkedQuarterATile: number): void {
    if (this._isEnabled) {
      this.setWalkingFrame(movementDirection, hasWalkedQuarterATile );
    }
  }

  setStandingFrame(direction: Direction): void {
    if (this._isEnabled) {
      this._setStandingFrame(direction);
    }
  }

  setDirectionChangingFrame(from: Direction, to: Direction, nth: number) : void {
    if (this._isEnabled) {
      this.sprite.setFrame(this.directioinChangingFrame.get(from).get(to)[nth])
    }
  }

  setWalkingAnimationMapping(
    walkingAnimationMapping: WalkingAnimationMapping
  ): void {
    this.walkingAnimationMapping = walkingAnimationMapping;
    this._isEnabled = this.walkingAnimationMapping !== undefined;
  }

  setCharacterIndex(characterIndex: number): void {
    this.characterIndex = characterIndex;
    this._isEnabled = this.characterIndex !== -1;
  }

  getWalkingAnimationMapping(): WalkingAnimationMapping | undefined {
    return this.walkingAnimationMapping;
  }

  getCharacterIndex(): number {
    return this.characterIndex;
  }

  private setStandingFrameDuringWalk(direction: Direction): void {
    if (!this.isCurrentFrameStanding(direction)) {
      this.lastFootLeft = !this.lastFootLeft;
    }
    this._setStandingFrame(direction);
  }

  private setWalkingFrame(direction: Direction, hasWalkedQuarterATile:number): void {
    const frameRow = this.framesOfDirection(direction);

    if (hasWalkedQuarterATile === 0) {
      this.sprite.setFrame( this.lastFootLeft ? frameRow.rightFoot1 : frameRow.leftFoot1 );
    } else if (hasWalkedQuarterATile === 1) {
      this.sprite.setFrame( this.lastFootLeft ? frameRow.rightFoot2 : frameRow.leftFoot2 )
    } else if (hasWalkedQuarterATile === 2) {
      this.sprite.setFrame( this.lastFootLeft ? frameRow.rightFoot1 : frameRow.leftFoot1 )
    } else {
      this.setStandingFrameDuringWalk(direction);
    }
  }
  
  private _setStandingFrame(direction: Direction): void {
    this.sprite.setFrame(this.framesOfDirection(direction).standing);
  }

  private isCurrentFrameStanding(direction: Direction): boolean {
    return (
      Number(this.sprite.frame.name) ==
      this.framesOfDirection(direction).standing
    );
  }

  private framesOfDirection(direction: Direction): FrameRow {
    if (this.walkingAnimationMapping) {
      return this.getFramesForAnimationMapping(direction);
    }
    return this.getFramesForCharIndex(direction);
  }

  private getFramesForAnimationMapping(direction: Direction): FrameRow {
    return (
      this.walkingAnimationMapping[direction] ||
      this.walkingAnimationMapping[this.fallbackDirection(direction)]
    );
  }

  private fallbackDirection(direction: Direction): Direction {
    switch (direction) {
      case Direction.DOWN_LEFT:
        return Direction.LEFT;
      case Direction.DOWN_RIGHT:
        return Direction.RIGHT;
      case Direction.UP_LEFT:
        return Direction.LEFT;
      case Direction.UP_RIGHT:
        return Direction.RIGHT;
    }

    return direction;
  }

  private getFramesForCharIndex(direction: Direction): FrameRow {
    const charsInRow =
      this.sprite.texture.source[0].width /
      this.sprite.width /
      CharacterAnimation.FRAMES_CHAR_ROW;
    const playerCharRow = Math.floor(this.characterIndex / charsInRow);
    const playerCharCol = this.characterIndex % charsInRow;
    const framesInRow = charsInRow * CharacterAnimation.FRAMES_CHAR_ROW;
    const framesInSameRowBefore =
      CharacterAnimation.FRAMES_CHAR_ROW * playerCharCol;
    const rows =
      this.directionToFrameRow[direction] +
      playerCharRow * CharacterAnimation.FRAMES_CHAR_COL;
    const startFrame = framesInSameRowBefore + rows * framesInRow;
    return {
      standing: startFrame,
      leftFoot1: startFrame + 1,
      leftFoot2: startFrame + 2,
      rightFoot1: startFrame + 3,
      rightFoot2: startFrame + 4,
    };
  }
}
