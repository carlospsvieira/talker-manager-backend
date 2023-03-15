const express = require('express');
const { getTalkers } = require('./utils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// req 01 endpoint returns status 200 with array of all talkers //
app.get('/talker', async (req, res) => {
  const talkers = await getTalkers();
  res.status(200).json(talkers);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// listen to port 3001 //
app.listen(PORT, () => {
  console.log('Online');
});
