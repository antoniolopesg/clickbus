import { Request, Response } from 'express';
import conn from '../database/conn';

class PlaceController {
  async index(req: Request, res: Response) {
    const { page = 1, name } = req.query;

    try {
      const query = conn('places')
        .select(['id', 'name', 'city', 'state'])
        .offset((page - 1) * 5)
        .limit(5);

      if (name) query.where('name', 'like', `%${name}%`);

      const places = await query;

      return res.json(places);
    } catch (err) {
      return res.status(500).json({ error: 'could not list the places' });
    }
  }

  async create(req: Request, res: Response) {
    const { name, city, state } = req.body;

    try {
      const place = await conn('places')
        .select('id')
        .where('name', name)
        .andWhere('city', city)
        .andWhere('state', state)
        .first();

      if (place) {
        return res
          .status(400)
          .json({ error: 'this place has already been registered' });
      }

      const slug = name.toLowerCase().replace(/ /g, '-');

      const [id] = await conn('places')
        .insert({ name, slug, city, state })
        .returning('id');

      return res.status(201).json({ id });
    } catch (err) {
      return res.status(500).json({ error: 'could not register the place' });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const place = await conn('places')
        .select(['id', 'name', 'city', 'state'])
        .where('id', '=', id)
        .first();

      if (!place)
        return res
          .status(400)
          .json({ error: 'no resource with specified id exists' });

      return res.json(place);
    } catch (err) {
      return res.status(500).json({ error: 'could not get the place' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const { name, city, state } = req.body;

    try {
      const place = await conn('places')
        .select('id')
        .where('id', '=', id)
        .first();

      if (!place)
        return res
          .status(400)
          .json({ error: 'no resource with specified id exists' });

      const hasPlace = await conn('places')
        .select('id')
        .where('name', name)
        .andWhere('city', city)
        .andWhere('state', state)
        .first();

      if (hasPlace && hasPlace.id !== place.id) {
        return res
          .status(400)
          .json({ error: 'this place has already been registered' });
      }

      const updatedPlace = await conn('places')
        .where('id', '=', id)
        .update({ name, city, state, updated_at: new Date() })
        .returning('*');

      return res.json(updatedPlace);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new PlaceController();
