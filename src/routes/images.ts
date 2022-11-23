import { Router, Request, Response } from 'express';
import image from '../utilities/image';
import { imagesCheck } from '../middleware/paramCheck';

const router = Router();

router.get(
  '/',
  imagesCheck,
  async (req: Request, res: Response): Promise<Response | void> => {
    const filename = req.query.file as string;
    const width = parseInt(req.query.width as string) || undefined;
    const height = parseInt(req.query.height as string) || undefined;

    if (width === undefined && height === undefined)
      return res.sendFile(image.fullPath(filename));

    if (!image.isCached(filename, width, height)) {
      // console.log('override'); // ? for debugging
      await image.resize(filename, width, height);
    }
    res.sendFile(image.thumbPath(filename));
  }
);

export default router;
