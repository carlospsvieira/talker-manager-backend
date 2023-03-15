const { allTalkers } = require('../utils');

// get all talkers //
async function getTalkers(_req, res) {
  try {
    const response = await allTalkers();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return [];
  }
}

// get talker by id //
async function getTalkerById(req, res) {
  const { id } = req.params;
  const talkers = await allTalkers();
  const wantedTalker = talkers.find((talker) => talker.id === Number(id));

  if (!wantedTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(200).json(wantedTalker);
}

// validate email and password //
function validEmail(req, res, next) {
  const { email } = req.body;
  const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!validRegex) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
}

function validPassword(req, res, next) {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
}

module.exports = { getTalkers, getTalkerById, validEmail, validPassword };
