import request from 'supertest';
import faker from 'faker';
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
    const place = {
      name: faker.address.streetName(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
    };

    const response = await request(app).post('/places').send(place);

    expect(response.status).toBe(201);
  });

  it('should not be able to register duplicated places', async () => {
    const place = {
      name: faker.address.streetName(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
    };

    await request(app).post('/places').send(place);

    const response = await request(app).post('/places').send(place);

    expect(response.status).toBe(400);
  });
});
