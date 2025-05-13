const express = require('express');
const serverless = require('serverless-http');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home_page.html'));
});

app.post('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  console.log('Hitting API!');
  res.send(JSON.stringify({ response: 'Hello!' }));
});

module.exports = app;
module.exports.handler = serverless(app);
