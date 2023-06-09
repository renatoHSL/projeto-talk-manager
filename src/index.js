const express = require('express');
const tokenGeneration = require('./utils/token');
const { readWriteFile, sendTalker, renewTalker, eraseTalker } = require('./utils/readWrite');
const { authVal,
  nomeVal,
  idadeVal,
  watchedAt,
  notaVal,
  talkVal } = require('./middlewares/validation');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await readWriteFile();
  if (data) {
    return res.status(200).json(data);
  } 
    return res.status(200).json([]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const people = await readWriteFile();
  const person = people.find((p) => p.id === Number(id));
  if (!person) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });    
  }
  res.status(200).json(person);
});

app.post('/login', (req, res) => {
  const validated = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!validated.test(email)) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = tokenGeneration();
  return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
 });

 app.post('/talker',
 authVal,
    nomeVal,
    idadeVal,
    talkVal,
    watchedAt,
    notaVal,
  async (req, res) => {
  const { body } = req;
  const result = await sendTalker(body);
  return res.status(201).json(result);
  });

  app.put('/talker/:id',
  authVal,
  nomeVal,
  idadeVal,
  talkVal,
  watchedAt,
  notaVal,
  async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const newTalker = await renewTalker(body, Number(id));
    res.status(200).json(newTalker);
  });

  app.delete('/talker/:id', authVal, async (req, res) => {
    const { id } = req.params;
    await eraseTalker(id);
    res.sendStatus(204);
  });