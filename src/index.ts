import express from 'express';
import 'dotenv/config';

const app = express();

app.get('/', (req, res) => res.send('<h1>Hello World</h1>'));

app.listen(process.env.PORT || 3333);
