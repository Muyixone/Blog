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

app.get('/', async (req, res, next) => {
  const blogPosts = await BlogPost.find({});
  res.render('index', { blogPosts });
});
app.get('/about', (req, res, next) => {
  res.render('about');
});
app.get('/contact', (req, res, next) => {
  res.render('contact');
});

/*
 * GET /blog
 * GET  single blog post
 */
app.get('/post/:id', async (req, res, next) => {
  const id = req.params.id;
  const blogPost = await BlogPost.findById(id);
  res.render('post', { blogPost });
});

app.get('/posts/new', (req, res, next) => {
  res.render('create');
});

app.post('/posts/store', async (req, res, next) => {
  let body = req.body;
  await BlogPost.create(body);
  res.redirect('/');
});
app.listen(port, (req, res) => {
  console.log('Server connected on port', port);
});

mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true });
