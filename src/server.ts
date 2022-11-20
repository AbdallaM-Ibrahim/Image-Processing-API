import express from 'express';
import images from './routes/images';

const app = express();
const PORT: number = (process.env.PORT as unknown as number) || 3000;

app.get('/', (req, res) => {
  res.redirect('/images?file=nightfall.jpg');
});

app.use('/images', images);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});

export default app;
