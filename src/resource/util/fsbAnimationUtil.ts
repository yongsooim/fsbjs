import { ImageSource, Sprite, SourceView, SpriteSheet } from 'excalibur';

/**
 * Create a SpriteSheet from an [[ImageSource]] made up with variable size sprites
 * @param imageSource Source image to use for each sprite
 * @param sourceViews An array of each sprites' source view 
 */
export function fromFlexImageSource(imageSource: ImageSource, sourceViews: SourceView[]): SpriteSheet {
  const sprites: Sprite[] = [];

  for (let i = 0; i < sourceViews.length; i++) {
    sprites[i] = new Sprite({
      image: imageSource,
      sourceView: sourceViews[i],
      destSize: { height: sourceViews[i].height, width: sourceViews[i].width }
    })
  }

  return new SpriteSheet({
    sprites: sprites
  });
}
