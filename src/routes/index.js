const express = require('express');
const { generateToken, fsWriteNewUponDelete } = require('../utils');
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
  updateTalker,
  createNewTalker,
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
    createNewTalker,
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
    updateTalker,
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
