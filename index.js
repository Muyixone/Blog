const express = require('express');

const path = require('path');

const app = express();

app.use(express.static('public'));

const port = 3333;

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.get('/about', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'about.html'));
});
app.get('/contact', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'contact.html'));
});
app.get((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'notfound.html'));
});

app.listen(port, (req, res) => {
  console.log('Server connected on port', port);
});
