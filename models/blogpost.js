const mongoose = require('mongoose');
const User = require('../models/userModel');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    tags: { type: [String] },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: 'User',
    },
    state: ['draft', 'published'],
    read_count: { type: Number, default: 0 },
    reading_time: { type: String },
    body: String,
    // image: { type: String },
  },
  { timestamps: true }
);
// BlogPostSchema.plugin(aggregatePaginate);
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;
