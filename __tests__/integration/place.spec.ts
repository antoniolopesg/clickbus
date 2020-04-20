import request from 'supertest';
import app from '../../src/app';
import conn from '../../src/database/conn';

describe('Place', () => {
  afterAll(() => {
    conn.destroy();
  });

  beforeEach(async () => {
    await conn('places').truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app).post('/places').send({
      name: 'Teresina Shopping',
      city: 'teresina',
      state: 'PI',
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to register duplicate places', async () => {
    await request(app).post('/places').send({
      name: 'Teresina Shopping',
      city: 'teresina',
      state: 'PI',
    });

    const response = await request(app).post('/places').send({
      name: 'Teresina Shopping',
      city: 'teresina',
      state: 'PI',
    });

    expect(response.status).toBe(400);
  });
});
