const authVal = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16 || typeof authorization !== 'string') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  };
  
  const nomeVal = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
  };
  
  const idadeVal = (req, res, next) => {
    const { age } = req.body;
  
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (typeof age !== 'number') {
      return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
    }
    if (!Number.isInteger(age)) {
    return res.status(400).json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
    }
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
  
    next();
  };
  
  const talkVal = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
  
    next();
  };
  
  const vistoVal = (req, res, next) => {
    const { talk } = req.body;
    const valida = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  
    if (!talk.watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!valida.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  };
  
  const validaRate = (rate) => (!Number.isInteger(rate) || rate < 1 || rate > 5);
  
  const notaVal = (req, res, next) => {
    const { talk: { rate } } = req.body;
  
    if (Number(rate) === 0) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    if (!rate) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (validaRate(rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  };
  
  module.exports = {   
    authVal,
    nomeVal,
    idadeVal,
    vistoVal,
    notaVal,
    talkVal,
  };