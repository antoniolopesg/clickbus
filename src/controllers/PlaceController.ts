import { Request, Response } from 'express';
import conn from '../database/conn';

class PlaceController {
  async create(req: Request, res: Response) {
    try {
      const [id] = await conn('places').insert(req.body).returning('id');

      return res.status(201).json({ id });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new PlaceController();
