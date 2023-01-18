const blogModel = require('../models/blogpost');

exports.getArticles = async (req, res, next) => {
  let aggregateOptions = [];

  // PAGINATION
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 20;
  //set the options for pagination
  const options = {
    page,
    limit,
    collation: { locale: 'en' },
    customLabels: {
      totalDocs: 'totalResults',
      docs: 'events',
    },
  };

  // FILTERING AND TEXT SEARCH -- FIRST STAGE
  let match = {};

  //filter by author's name -
  //using $regex in mongodb the 'i' flag is added to make the search case-insensitive
  if (req.query.q) {
    match.author = { $regex: req.query.q, $options: 'i' };
  }

  //filter by tags
  if (req.query.tags) {
    match.tags = { tags: req.query.tags };
  }

  //filter by title
  if (req.query.title) {
    match.title = { title: req.query.title };
  }

  //Push the filtered results into the aggregateOptions object
  aggregateOptions.push({ $match: match });

  //GROUPING BY READ_COUNT, READ_TIME, AND TIME_STAMP -- SECOND STAGE

  // SORTING -- THIRD STAGE
  let sortOrder =
    req.query.sortOrder && req.query.sortOrder === 'desc' ? -1 : 1;
  aggregateOptions.push({ $sort: { datePosted: sortOrder } });

  // Set up the aggregation
  const myAggregation = blogModel.aggregate(aggregateOptions);
  const results = await blogModel.paginate(myAggregation, options);
  res.status(200).json(results);

  //Find all posts and sort them by datePosted from the most recent
  // const article = await blogModel.find({}).sort({ datePosted: 'desc' });
  // return res.status(200).json({
  //   statusCode: 200,
  //   message: 'Fetch articles successfully',
  //   data: { article },
  // });
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
