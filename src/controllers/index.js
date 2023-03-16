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

// validate password //
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

// validate token //
function validToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== 16 || typeof authorization !== 'string') {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
}

// validate name //
function validName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
}

// validate age //
function validAge(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (!Number.isInteger(age) || age < 18) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }

  next();
}

// validate talk //
function validTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  }

  if (talk.rate === 0) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
}

// velidate watched at //
function validWatchedAt(req, res, next) {
  const {
    talk: { watchedAt },
  } = req.body;
  const validRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(watchedAt);

  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }

  if (!validRegex) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
}

// validade rate //
function validRate(req, res, next) {
  const {
    talk: { rate },
  } = req.body;
  if (!rate) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
}

module.exports = {
  getTalkers,
  getTalkerById,
  validEmail,
  validPassword,
  validToken,
  validName,
  validAge,
  validTalk,
  validWatchedAt,
  validRate,
};
