import { Request, Response } from 'express';

class PlaceController {
  async create(req: Request, res: Response) {
    return res.json({ id: 1 });
  }
}

export default new PlaceController();
