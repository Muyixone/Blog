const blogModel = require('../models/blogpost');
const User = require('../models/userModel');
const dayjs = require('dayjs');
const mongoose = require('mongoose');

exports.getArticles = async (req, res) => {
  //Populate/lookup the author field froom the user collection
  let query = [
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    { $unwind: '$author' },
  ];

  //Filter and Search by title and author's first or last name
  if (req.query.keyword && req.query.keyword != '') {
    query.push({
      $match: {
        $or: [
          {
            title: { $regex: req.query.keyword, $options: 'i' },
          },
          {
            'author.firstname': { $regex: req.query.keyword, $options: 'i' },
          },
          { 'author.lastname': { $regex: req.query.keyword, $options: 'i' } },
        ],
      },
    });
  }

  //Filer and search by tags
  if (req.query.tags) {
    query.push({
      $match: { tags: { $regex: req.query.tags, $options: 'i' } },
    });
  }

  //Count the total number of documents in the collection
  let total = await blogModel.countDocuments(query);
  // PAGINATION
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 20;
  let skip = (page - 1) * limit;
  //set the options for pagination

  query.push({ $skip: skip });
  query.push({ $limit: limit });

  // Remove the _id, email and password fields from the final document to be displayed
  query.push({
    $project: {
      'author._id': 0,
      'author.email': 0,
      'author.password': 0,
    },
  });

  let blogs = await blogModel.aggregate(query);
  res.status(200).json({
    message: 'Success',
    data: {
      blogs,
      options: {
        total,
        currentPage: page,
        perPage: limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  });

  // FILTERING AND TEXT SEARCH -- FIRS T STAGE
  //let query = {};
  // if (req.query.author) {
  //   query.author = req.query.author;
  // }
  // if (req.query.keyword) {
  //   query.$or = [
  //     { title: { $regex: req.query.keyword, $options: 'i' } },
  //     { tags: { $regex: req.query.keyword, $options: 'i' } },
  //   ];
  // }

  // let blog = await blogModel.find(query).populate('author', 'firstname');

  // return res.status(200).json({
  //   messaged: 'Success',
  //   data: blog,
  // });

  //filter by author's name -
};

exports.getSingleArticle = async (req, res, next) => {
  const article = await blogModel
    .findOne({ id: req.params.id })
    .sort({ datePosted: 'desc' });

  return res.status(200).json({
    statusCode: 200,
    message: 'Fetch single article successfully',
    data: {
      article: article || {},
    },
  });
};
