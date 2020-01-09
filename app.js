// app.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connection = require('./connection');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_, res) => res.json({ message: 'Hello World!' }));

app.post('/bookmarks', (req, res) => {
  const { url, title } = req.body;
  if (!url || !title) {
    return res.status(422).json({ error: 'required field(s) missing' });
  }
  return res.sendStatus(201);
});

module.exports = app;
