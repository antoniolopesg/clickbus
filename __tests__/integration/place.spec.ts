import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app).post('/places').send({
      name: 'Teresina Shopping',
      slug: 'teresina-shopping',
      city: 'teresina',
      state: 'PI',
    });

    expect(response.body).toHaveProperty('id');
  });
});
