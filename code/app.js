const express = require('express');
const path = require('path');
const serverless = require('serverless-http');

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('home_page.html', { root: path.join(__dirname, 'public') });
});

app.post('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  console.log('Hitting API!'); // Show up in Terminal
  const ouptut = {
    response: 'Hello!',
  };

  res.send(JSON.stringify(ouptut));
});

app.listen(port, () => {
  console.log(`Express app listening on port: ${port}`);
});