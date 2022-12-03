const express = require('express');
const ejs = require('ejs');

const path = require('path');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

const port = 3333;

app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/about', (req, res, next) => {
  res.render('about');
});
app.get('/contact', (req, res, next) => {
  res.render('contact');
});
app.get('/post', (req, res, next) => {
  res.render('post');
});

app.listen(port, (req, res) => {
  console.log('Server connected on port', port);
});
