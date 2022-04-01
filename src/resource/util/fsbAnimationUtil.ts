import { ImageSource, Sprite, SourceView, SpriteSheet } from 'excalibur'

/**
 * Create a SpriteSheet from an [[ImageSource]] made up with variable sized sprites
 * 
 * Example:
 * ```
 * const spriteSheet = SpriteSheet.fromFlexImageSource({
 *   image: imageSource,
 *   sourceViews: {[
 *     { x:  15, y:   9, width: 51, height: 68 },
 *     { x:  95, y:   9, width: 51, height: 68 },
 *     { x: 175, y:   9, width: 51, height: 68 },
 *     { x:  12, y: 105, width: 56, height: 71 },
 *     { x:  85, y: 105, width: 66, height: 78 },
 *     { x: 164, y: 105, width: 71, height: 82 }
 *   ]}
 * })
 * ```
 * @param imageSource Source image to use for each sprite
 * @param sourceViews An array of each sprites' source view
 *
 */
export function fromFlexImageSource (imageSource: ImageSource, sourceViews: SourceView[]): SpriteSheet {
  const sprites: Sprite[] = []
  for (let i = 0; i < sourceViews.length; i++) {
    sprites[i] = new Sprite({
      image: imageSource,
      sourceView: sourceViews[i],
      destSize: { height: sourceViews[i].height, width: sourceViews[i].width }
    })
  }
  return new SpriteSheet({ sprites: sprites })
}
