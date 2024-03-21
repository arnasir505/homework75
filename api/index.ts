import express from 'express';
import cors from 'cors';
import { Message } from './types';
const Vigenere = require('caesar-salad').Vigenere;

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => {
  return res.send('Home');
});

app.post('/encode', (req, res) => {
  const messageData: Message = {
    password: req.body.password,
    message: req.body.message,
  };
  const encodedMsg = Vigenere.Cipher(messageData.password).crypt(
    messageData.message
  );
  res.send({ encoded: encodedMsg });
});

app.post('/decode', (req, res) => {
  const messageData: Message = {
    password: req.body.password,
    message: req.body.message,
  };
  const decodedMsg = Vigenere.Decipher(messageData.password).crypt(
    messageData.message
  );
  res.send({ decoded: decodedMsg });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}\n`);
});
