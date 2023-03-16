const express = require('express');
const { generateToken, allTalkers, fsWriteFile, fsWriteNewUponDelete } = require('../utils');
const {
  getTalkers,
  getTalkerById,
  validEmail,
  validPassword,
  validToken,
  validAge,
  validName,
  validRate,
  validWatchedAt,
  validTalk,
} = require('../controllers');

const router = express.Router();

// req 01 endpoint returns status 200 with array of all talkers //
// req 05 route post new talker //
router
  .get('/talker', getTalkers)
  .post(
    '/talker',
    validToken,
    validAge,
    validName,
    validTalk,
    validRate,
    validWatchedAt,
    async (req, res) => {
      const item = req.body;
      const talkers = await allTalkers();
      item.id = talkers.length + 1;
      await fsWriteFile(item);
      return res.status(201).json(item);
    },
  );

// req 02 get talker by id //
// req 06 route edit talker //
router
  .get('/talker/:id', getTalkerById)
  .put(
    '/talker/:id',
    validToken,
    validName,
    validAge,
    validTalk,
    validRate,
    validWatchedAt,
    async (req, res) => {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const talkers = await allTalkers();
      const updatedTalker = talkers.find((talker) => talker.id === Number(id));

      if (!updatedTalker) {
        return res.status(404).json({
          message: 'Pessoa palestrante não encontrada',
        });
      }
      updatedTalker.name = name;
      updatedTalker.age = age;
      updatedTalker.talk = talk;
      await fsWriteFile(updatedTalker);
      return res.status(200).json(updatedTalker);
    },
  )
  .delete('/talker/:id', validToken, async (req, res) => {
    const { id } = req.params;
    await fsWriteNewUponDelete(id);
    return res.status(204).json();
  });

// req 03 and 04, generate token on validation //
router.post('/login', validEmail, validPassword, (_req, res) => {
  const newToken = generateToken();
  return res.status(200).json({
    token: newToken,
  });
});

module.exports = router;
