const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');

const BlogPost = require('./models/blogpost');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
app.get('/post/new', (req, res, next) => {
  res.render('create');
});
app.post('/post/store', async (req, res, next) => {
  let body = req.body;
  await BlogPost.create(body);
});
app.listen(port, (req, res) => {
  console.log('Server connected on port', port);
});

mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true });
