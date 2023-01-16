const mongoose = require('mongoose');
const User = require('./userModel');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: String,
    author: {
      type: String,
      required: true,
    },
    state: ['draft', 'published'],
    read_count: { type: Number },
    reading_time: { type: String },
    body: String,
    datePosted: { type: Date, default: new Date() },
    // image: { type: String },
  },
  { timestamp: true }
);

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;
