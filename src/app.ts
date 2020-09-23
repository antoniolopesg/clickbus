import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';

import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());

app.use(routes);

// Validation errors to JSON
app.use(errors());

// Not found
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res
    .status(500)
    .json({ error: 'Sorry, there was a problem with the server.' });
});

export default app;
