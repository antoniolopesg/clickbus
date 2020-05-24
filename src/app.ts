import express from 'express';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(express.json());

app.use(routes);

// Validation errors to JSON
app.use(errors())

// Not found
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
});

export default app;
