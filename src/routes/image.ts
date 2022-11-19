import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import sizeOf from 'image-size';

const router = Router();

const fullPath = (filename: string) => path.join(process.cwd(), 'assets', 'full', filename);
const thumbPath = (filename: string) => path.join(process.cwd(), 'assets', 'thumb', filename);

export const resize = async (
  originalPath: string,
  width: number | undefined,
  height: number | undefined
): Promise<void> => {
  const fileName = path.basename(originalPath);
  const destinationPath = thumbPath(fileName);
  await sharp(originalPath).resize(width, height).toFile(destinationPath);
};

export const isCached = (
  filename: string,
  newWidth: number | undefined,
  newHeight: number | undefined
): boolean => {
  const filePath = thumbPath(filename);
  const { width: cachedWidth, height: cachedHeight } = sizeOf(filePath);
  return (cachedWidth === newWidth && cachedHeight === newHeight);
} 


router.get('/', async (req, res) => {
  const filename = req.query.file as string;
  const width = parseInt(req.query.width as string) || undefined;
  const height = parseInt(req.query.height as string) || undefined;
  if (!filename)
    return res
      .status(400)
      .send(
        'you need to spacify a file name as: <br />' +
          '/images?file=FILE_NAME&width=NUMBER&height=NUMBER'
      );

  const originalPath = fullPath(filename);
  if (!fs.existsSync(originalPath))
    return res.status(400).send(`Couldn't find file: ${filename}`);

  if (width === undefined && height === undefined)
    return res.sendFile(originalPath);

  const sizedPath = thumbPath(filename);
  if(!isCached(filename, width, height)) {
    // console.log('override'); // ? for debugging
    await resize(originalPath, width, height);
  }
  res.sendFile(sizedPath);
});

export default router;
