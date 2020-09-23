import { Router, Request, Response } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PlaceController from './controllers/PlaceController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    project: 'ClickBus',
    github: 'https://github.com/antoniolopesg/clickbus',
    description:
      'A place management API (CRUD) made with node.js using test-driven development.',
    endpoints: [{}],
  });
});

router.get(
  '/places',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().integer(),
      name: Joi.string().min(1),
    }),
  }),
  PlaceController.index
);

router.get(
  '/places/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().required(),
    }),
  }),
  PlaceController.show
);

router.post(
  '/places',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(1),
      city: Joi.string().required().min(1),
      state: Joi.string().required().min(2).max(2),
    }),
  }),
  PlaceController.create
);

router.put(
  '/places/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(1),
      city: Joi.string().min(1),
      state: Joi.string().min(2).max(2),
    }),
  }),
  PlaceController.update
);

router.delete(
  '/places/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer(),
    }),
  }),
  PlaceController.delete
);

export default router;
