import request from 'supertest';
import { address } from 'faker';
import app from '../../src/app';
import conn from '../../src/database/conn';

describe('Place', () => {
  afterAll(async () => {
    await conn.destroy();
  });

  beforeEach(async () => {
    await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  it('should be able to register', async () => {
    const place = {
      name: address.streetName(),
      city: address.city(),
      state: address.stateAbbr(),
    };

    const response = await request(app).post('/places').send(place);

    expect(response.status).toBe(201);
  });

  it('should not be able to register duplicated places', async () => {
    const place = {
      name: address.streetName(),
      city: address.city(),
      state: address.stateAbbr(),
    };

    await request(app).post('/places').send(place);

    const response = await request(app).post('/places').send(place);

    expect(response.status).toBe(400);
  });

  it('should be able to list places', async () => {
    const place = {
      name: address.streetName(),
      city: address.city(),
      state: address.stateAbbr(),
    };

    const anotherPlace = {
      name: address.streetName(),
      city: address.city(),
      state: address.stateAbbr(),
    };

    const resp = await request(app).post('/places').send(place);

    await request(app).post('/places').send(anotherPlace);

    const response = await request(app).get('/places');

    expect(response.body).toEqual(
      expect.arrayContaining([{id: 1, ...place}, { id: 2, ...anotherPlace }])
    );
  });

  it('should be able to get a specific place', async () => {
    await request(app).post('/places').send({
      name: address.streetName(),
      city: address.city(),
      state: address.stateAbbr(),
    });

    const response = await request(app).get('/places/1');

    expect(response.body).toHaveProperty('id');
  });

  it('should be able to update already registered places', async () => {
    await request(app).post('/places').send({
      name: address.streetName(),
      city: address.city(),
      state: address.stateAbbr(),
    });

    const response = await request(app).put('/places/1').send({
      name: address.streetName(),
      city: address.city(),
      state: address.stateAbbr(),
    });

    expect(response.status).toBe(200);
  });

  it('should be able list places filtering by name', async () => {
    const place = {
      name: 'Teresina Shopping',
      city: 'Teresina',
      state: 'PI',
    };

    const anotherPlace = {
      name: 'Cocais Shopping',
      city: 'Timon',
      state: 'MA',
    };

    await request(app).post('/places').send(place);
    await request(app).post('/places').send(anotherPlace);

    const response = await request(app).get('/places?name=sina');

    expect(response.body).toHaveLength(1);
  });

  it('should be able to delete a specific place', async () => {
    await request(app).post('/places').send({
      name: address.streetName(),
      city: address.city(),
      state: address.stateAbbr(),
    });

    const response = await request(app).delete('/places/1');

    expect(response.status).toBe(204);
  });

  it('cannot be able to delete places that have not been registered', async () => {
    const response = await request(app).delete('/places/400');
    expect(response.status).toBe(400);
  });
});
