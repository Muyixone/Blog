const blogModel = require('../models/blogpost');
const User = require('../models/userModel');
const dayjs = require('dayjs');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const { fileLoader } = require('ejs');

exports.getArticles = async (req, res) => {
  //Populate/lookup the author field from the user collection in the db
  //The result will be an array of author, and because the $concat method
  // can not work on arrays, we use the $unwind method to convert to a string
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

  //Filter and Search by title
  if (req.query.title && req.query.title != '') {
    query.push({
      $match: {
        title: { $regex: req.query.title, $options: 'i' },
      },
    });
  }

  //Filter By author's name
  if (req.query.author && req.query.author != '') {
    query.push({
      $match: {
        $or: [
          {
            'author.firstname': { $regex: req.query.author, $options: 'i' },
          },
          { 'author.lastname': { $regex: req.query.author, $options: 'i' } },
        ],
      },
    });
  }

  //Filer and search by tags
  if (req.query.tags && req.query.tags != '') {
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
  // Concat the author field into one whole string value
  query.push({
    $project: {
      author: { $concat: ['$author.firstname', ' ', '$author.lastname'] },
      title: 1,
      description: 1,
      tags: 1,
      state: 1,
      reading_time: 1,
      body: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  });

  //Sort the document by any of the fields specified
  //check if the query parameters === sortBy and sortOrder
  //if true, return the document in ascending order of the specified field
  //else the defualt order will be in descending order of the createdAt field
  if (req.query.sortBy && req.query.sortOrder) {
    var sort = {};
    sort[req.query.sortBy] = req.query.sortOrder == 'asc' ? 1 : -1;
    query.push({
      $sort: sort,
    });
  } else {
    query.push({
      $sort: { createdAt: -1 },
    });
  }

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
  let articles = await blogModel.findById(req.params.id);
  articles.read_count += 1;
  articles.save();
  return res.json({
    message: 'Article fetched successfully',
    articles,
  });
};
