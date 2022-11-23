import { Request, Response, NextFunction } from 'express';
import image from '../utilities/image';

export const imagesCheck = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const filename = req.query.file as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  if (!filename)
    return res
      .status(400)
      .send(
        'you need to spacify a file name as: <br />' +
          '/images?file=FILE_NAME&width=NUMBER&height=NUMBER'
      );

  if (!image.fileExists(filename))
    return res.status(400).send(`Couldn't find file: ${filename}`);

  if (width)
    try {
      if (parseInt(width) <= 0)
        throw new Error(`negative value for width: ${width}`);
    } catch {
      req.query.width = undefined;
    }

  if (height)
    try {
      if (parseInt(height) <= 0)
        throw new Error(`negative value for height: ${height}`);
    } catch {
      req.query.height = undefined;
    }

  next();
};
