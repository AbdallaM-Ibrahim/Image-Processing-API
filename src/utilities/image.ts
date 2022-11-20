import sharp from 'sharp';
import sizeOf from 'image-size';
import path from 'path';
import fs from 'fs';

export const fullPath = (filename: string) =>
  path.join(process.cwd(), 'assets', 'full', filename);
export const thumbPath = (filename: string) =>
  path.join(process.cwd(), 'assets', 'thumb', filename);

export const fileExists = (filename: string) =>
  fs.existsSync(fullPath(filename));

export const resize = async (
  filename: string,
  width: number | undefined,
  height: number | undefined
): Promise<void> => {
  const originalPath = fullPath(filename);
  const destinationPath = thumbPath(filename);
  await sharp(originalPath).resize(width, height).toFile(destinationPath);
};

export const isCached = (
  filename: string,
  newWidth: number | undefined,
  newHeight: number | undefined
): boolean => {
  const filePath = thumbPath(filename);
  if(!fs.existsSync(filePath)) return false;
  const { width: cachedWidth, height: cachedHeight } = sizeOf(filePath);
  return cachedWidth === newWidth && cachedHeight === newHeight;
};

export default {
  fullPath,
  thumbPath,
  fileExists,
  resize,
  isCached
};
