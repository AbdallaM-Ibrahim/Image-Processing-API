import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Testing quary paramters' , () => {
  const fileName = 'nightfall.jpg';
  const endpoint = 'images';

  it('should fail when no_file or not_exist', async () => {
    let response = await request.get(`/${endpoint}`);
    expect(response.status).toBe(400);
    response = await request.get(`/${endpoint}?file=not_exist.jpg`);
    expect(response.status).toBe(400);
  });

  it('should fail when height are not numbers or positive', async () => {
    let response = await request.get(`/${endpoint}?file=${fileName}&height=not_a_number`);
    expect(response.status).toBe(400);
    response = await request.get(`/${endpoint}?file=${fileName}&height=-225`);
    expect(response.status).toBe(400);
  })

  it('should fail when width are not numbers or positive', async () => {
    let response = await request.get(`/${endpoint}?file=${fileName}&width=not_a_number`);
    expect(response.status).toBe(400);
    response = await request.get(`/${endpoint}?file=${fileName}&width=-225`);
    expect(response.status).toBe(400);
  })


});