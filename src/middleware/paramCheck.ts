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
    return res.status(400).send(`Couldn't find file with name: ${filename}`);

  if (width)
    try {
      const widthNum = parseInt(width)
      if (isNaN(widthNum) || parseInt(width) <= 0)
        throw new Error(`Value of width should be positive number received: ${width}`);
    } catch(e) {
      return res.status(400).send((<Error>e).message + '<br />  ' + `Your value should be a number and positive`);
    }

  if (height)
    try {
      const heightNum = parseInt(height)
      if (isNaN(heightNum) || heightNum <= 0)
        throw new Error(`Value of height should be positive number received: ${height}`);
      } catch(e) {
        return res.status(400).send((<Error>e).message + '<br />  ' + `Your value should be a number and positive`);
      }

  next();
};
