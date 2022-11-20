import sizeOf from 'image-size';
import { thumbPath, fileExists, resize, isCached } from '../../utilities/image';

describe('testing image resizing', async () => {
  const filename = 'nightfall.jpg';

  it('should check file existance', async () => {
    expect(fileExists(filename)).toBe(true);
  });

  it('should resize to given dimentions', async () => {
    const [width, height] = [518, 346];

    await resize(filename, width, height);
    const dimentions = sizeOf(thumbPath(filename));
    expect(dimentions.width).toBe(width);
    expect(dimentions.height).toBe(height);
  });

  it('should cache', async () => {
    const [width, height] = [520, 330];
    await resize(filename, width, height);
    expect(isCached(filename, width, height)).toBe(true);
  });
});
