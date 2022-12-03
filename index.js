const express = require('express');

const path = require('path');

const app = express();

app.use(express.static('public'));

const port = 3333;

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});
app.get('/about', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});
app.get('/contact', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});
app.get('/post', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.listen(port, (req, res) => {
  console.log('Server connected on port', port);
});
