import { Router, Request, Response } from 'express';

import PlaceController from './controllers/PlaceController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    project: 'ClickBus-TDD',
    github: 'https://github.com/antoniolopesg/ClickBus-TDD',
    description:
      'A place management API (CRUD) made with node.js using test-driven development.',
    endpoints: [{}],
  });
});

router.get('/places', PlaceController.index);
router.get('/places/:id', PlaceController.show);
router.post('/places', PlaceController.create);
router.put('/places/:id', PlaceController.update);

export default router;
