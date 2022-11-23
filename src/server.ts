import express, { Request, Response } from 'express';
import images from './routes/images';

const app = express();
const PORT: number = (process.env.PORT as unknown as number) || 3000;

app.get('/', (req: Request, res: Response): void => {
  res.redirect('/images?file=nightfall.jpg');
});

app.use('/images', images);

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});

export default app;
