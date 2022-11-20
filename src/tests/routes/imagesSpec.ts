import supertest from 'supertest';
import sizeOf from 'image-size';
import app from '../../server';

const request = supertest(app);

describe('Serving sized image', () => {
  const fileName = 'nightfall.jpg';
  const endpoint = 'images';

  it('should fail when no_file or not_exist', async () => {
    let response = await request.get(`/${endpoint}`);
    expect(response.status).toBe(400);
    response = await request.get(`/${endpoint}?file=not_exist.jpg`);
    expect(response.status).toBe(400);
  });

  it('should gets full image', async () => {
    const response = await request.get(`/${endpoint}?file=${fileName}`);
    const dimentions = sizeOf(response.body);
    expect(dimentions.width).toBe(5184);
    expect(dimentions.height).toBe(3456);
  });

  it('should serve sized image', async () => {
    const [width, height] = [200, 200];
    const response = await request.get(
      `/${endpoint}?file=${fileName}&width=${width}&height=${height}`
    );
    const dimentions = sizeOf(response.body);
    expect(dimentions.width).toBe(width);
    expect(dimentions.height).toBe(height);
  });
});
