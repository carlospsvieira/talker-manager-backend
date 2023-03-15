const express = require('express');
const { getTalkers } = require('./utils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// req 01 endpoint returns status 200 with array of all talkers //
app.get('/talker', async (req, res) => {
  const talkers = await getTalkers();
  res.status(200).json(talkers);
});

// req 02 get talker by id //
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const wantedTalker = talkers.find((talker) => talker.id === Number(id));

  if (!wantedTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(200).json(wantedTalker);
});

// listen to port 3001 //
app.listen(PORT, () => {
  console.log('Online');
});
