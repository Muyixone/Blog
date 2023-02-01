const blogModel = require('../models/blogpost');
const User = require('../models/userModel');
const dayjs = require('dayjs');
const mongoose = require('mongoose');

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
  // Concatenate the author field into one whole string value
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
  try {
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
  } catch (error) {
    return res.status(404).json({
      message: error.message,
      data: {},
    });
  }

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
  // Check if the id passed is valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid blog id',
      data: {},
    });
  }
  let articles = await blogModel.findById(req.params.id);

  if (!articles) {
    return res.status(400).json({
      message: 'Invalid blog id',
      data: {},
    });
  }
  try {
    articles.read_count += 1;

    articles.save();
    return res.json({
      message: 'Article fetched successfully',
      articles,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
      data: {},
    });
  }
};

exports.getAuthorArticles = async (req, res, next) => {
  let currentUser = req.user;
  // let query = [
  //   {
  //     $lookup: {
  //       from: 'users',
  //       localField: 'author',
  //       foreignField: '_id',
  //       as: 'author',
  //     },
  //   },
  //   { $unwind: '$author' },
  // ];

  console.log(blog.title);
  try {
    const allArticles = await blogModel.find({});
    if (!allArticles) {
      return res.status(404).json({
        messge: 'No post for this id',
      });
    }

    let blog = [];

    allArticles.forEach((article) => {
      if (article.author != currentUser.id) {
        return;
      }
      blog.push(article);
    });

    // PAGINATION;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    blog.push({ skip: skip, limit: limit });
    const total = await blogModel.estimatedDocumentCount(blog);
    res.status(200).json({
      message: 'Successfully fetched data',
      data: {
        blog,
        options: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
