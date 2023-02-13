const express = require('express');
const { readWriteFile } = require('./utiils/readWrite');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
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