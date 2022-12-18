const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');

const path = require('path');

const BlogPost = require('./models/blogpost');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressFileUpload());

app.set('view engine', 'ejs');

const port = 3333;

/*
 * GET / the home page
 * GET  all posts from the database
 */
app.get('/', async (req, res, next) => {
  const blogPosts = await BlogPost.find({});
  res.render('index', { blogPosts });
});

/*
 * GET /about page
 *
 */
app.get('/about', (req, res, next) => {
  res.render('about');
});

/*
 * GET /contact page
 *
 */
app.get('/contact', (req, res, next) => {
  res.render('contact');
});

/*
 * GET /post/:id
 * GET  single blog post byits id
 */
app.get('/post/:id', async (req, res, next) => {
  const id = req.params.id;
  const blogPost = await BlogPost.findById(id);
  res.render('post', { blogPost });
});

/*
 * GET /posts/new
 * Get's the page to create a new blog post
 */
app.get('/posts/new', (req, res, next) => {
  res.render('create');
});

/*
 * POST /posts/store
 * Create's a new blog post
 */
app.post('/posts/store', async (req, res, next) => {
  let body = req.body;
  let image = req.files.image;
  image.mv(path.resolve(__dirname, 'public/img', image.name), async (err) => {
    await BlogPost.create({
      ...body, //Used a spread operator, cos the site cratches without it
      image: '/img/' + image.name,
    });
    res.redirect('/');
  });
});
app.listen(port, (req, res) => {
  console.log('Server connected on port', port);
});

mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true });
