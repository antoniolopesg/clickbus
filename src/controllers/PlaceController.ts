import { Request, Response } from 'express';
import conn from '../database/conn';
import AppError from '../errors/AppError';

class PlaceController {
  async index(req: Request, res: Response) {
    const { page = 1, name } = req.query;

    const query = conn('places')
      .select(['id', 'name', 'city', 'state'])
      .offset((page - 1) * 5)
      .limit(5);

    if (name) query.where('name', 'like', `%${name}%`);

    const places = await query;

    return res.json(places);
  }

  async create(req: Request, res: Response) {
    const { name, city, state } = req.body;

    const place = await conn('places')
      .select('id')
      .where('name', name)
      .andWhere('city', city)
      .andWhere('state', state)
      .first();

    if (place)
      throw new AppError('this place has already been registered', 400);

    const slug = name.toLowerCase().replace(/ /g, '-');

    const [id] = await conn('places')
      .insert({ name, slug, city, state })
      .returning('id');

    return res.status(201).json({ id });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const place = await conn('places')
      .select(['id', 'name', 'city', 'state'])
      .where('id', '=', id)
      .first();

    if (!place) throw new AppError('no resource with specified id exists', 400);

    return res.json(place);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const { name, city, state } = req.body;

    const place = await conn('places')
      .select('id')
      .where('id', '=', id)
      .first();

    if (!place) throw new AppError('no resource with specified id exists', 400);

    const hasPlace = await conn('places')
      .select('id')
      .where('name', name)
      .andWhere('city', city)
      .andWhere('state', state)
      .first();

    if (hasPlace && hasPlace.id !== place.id)
      throw new AppError('this place has already been registered', 400);

    const updatedPlace = await conn('places')
      .where('id', '=', id)
      .update({ name, city, state, updated_at: new Date() })
      .returning('*');

    return res.json(updatedPlace);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const place = await conn('places')
      .select('id')
      .where('id', '=', id)
      .first();

    if (!place) throw new AppError('no resource with specified id exists', 400);

    await conn('places').del().where('id', '=', id);

    return res.status(204).send();
  }
}

export default new PlaceController();
