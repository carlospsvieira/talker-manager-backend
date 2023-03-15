const express = require('express');
const { getTalkers, getTalkerById } = require('../utils');

const router = express.Router();

// req 01 endpoint returns status 200 with array of all talkers //
router.get('/talker', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(200).json(talkers);
});

// req 02 get talker by id //
router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const response = await getTalkerById(id);

  if (!response) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(200).json(response);
});

module.exports = router;