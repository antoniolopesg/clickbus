import app from './app';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Express server is listening on: http://localhost:${PORT}`);
});
