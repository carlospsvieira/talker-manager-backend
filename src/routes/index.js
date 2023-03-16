const express = require('express');
const { generateToken, allTalkers, fsWriteFile } = require('../utils');
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
// req 5 route post new talker //
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
router.get('/talker/:id', getTalkerById);

// req 03 and 04, generate token on validation //
router.post('/login', validEmail, validPassword, (_req, res) => {
  const newToken = generateToken();
  return res.status(200).json({
    token: newToken,
  });
});

module.exports = router;
