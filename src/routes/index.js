const express = require('express');
const { generateToken } = require('../utils');
const {
  getTalkers,
  getTalkerById,
  validEmail,
  validPassword,
} = require('../controllers');

const router = express.Router();

// req 01 endpoint returns status 200 with array of all talkers //
router.get('/talker', getTalkers);

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
