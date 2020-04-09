import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.send('<h1>Hello World</h1>');
});

app.listen(process.env.PORT || 3333);