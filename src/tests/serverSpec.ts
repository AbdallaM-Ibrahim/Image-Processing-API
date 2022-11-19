import supertest from 'supertest';
import app from '../server';

describe('testing server endpoints', () => {
  const request = supertest(app);
  it('should run the server', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(302);
  });

  it('should have /images endpoint', async () => {
    const response = await request.get('/images');
    expect(response.status).toBeLessThan(404);
  });
});
