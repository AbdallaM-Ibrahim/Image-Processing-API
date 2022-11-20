import { Router } from 'express';
import image from '../utilities/image';

const router = Router();

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

  if (!image.fileExists(filename))
    return res.status(400).send(`Couldn't find file: ${filename}`);

  if (width === undefined && height === undefined)
    return res.sendFile(image.fullPath(filename));

  if (!image.isCached(filename, width, height)) {
    // console.log('override'); // ? for debugging
    await image.resize(filename, width, height);
  }
  res.sendFile(image.thumbPath(filename));
});

export default router;
