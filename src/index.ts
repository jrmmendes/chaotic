import express from 'express';

const app = express();

app.route('/ping').all((req, res) => {
  return res.status(200).send('pong');
})

app.listen(3000, () => console.log('App started'));