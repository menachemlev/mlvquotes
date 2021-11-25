const Quotes = require('../models/quotesModel');
const User = require('./../models/userModel');

const catchAsync = require('./../util/catchAsync');
const AppError = require('../util/appError');

exports.addQuote = catchAsync(async (req, res, next) => {
  const quote = await Quotes.create({
    title: req.body.title,
    text: req.body.text,
    username: req.body.username,
    email: req.body.email,
  });
  if (!quote) {
    return next(new AppError('Could not create quote!', 500));
  }
  res.status(201).json({
    status: 'success',
    data: {
      quote,
    },
  });
});
exports.getQuotes = catchAsync(async (req, res, next) => {
  let restOfQuotes = [],
    quotes = [];
  if (req.query.accounts) {
    quotes = Quotes.aggregate([
      {
        $match: {
          username: { $in: req.query.accounts.split(',') },
        },
      },
      { $sort: { username: 1 } },
    ]);
    quotes.limit(+req.query.results);
    quotes = await quotes;

    if (!Array.isArray(quotes)) {
      return next(new AppError('Something went very wrong!', 500));
    }
  } else {
    quotes = [];
  }

  if (quotes.length < +req.query.results) {
    restOfQuotes = Quotes.aggregate([
      {
        $match: {
          username: { $nin: req.query.accounts.split(',') },
        },
      },
      { $sort: { username: 1 } },
    ]);
    restOfQuotes.limit(+req.query.results - quotes.length);
    restOfQuotes = await restOfQuotes;
    if (!Array.isArray(restOfQuotes)) {
      return next(new AppError('Something went very wrong!', 500));
    }
  }

  quotes = [...quotes, ...restOfQuotes];

  res.status(200).json({
    status: 'success',
    data: {
      quotes,
    },
  });
});

exports.addLike = catchAsync(async (req, res, next) => {
  const quote = await Quotes.findById(req.body.id);
  if (!quote) {
    return next(new AppError('Quote not found!', 404));
  }
  quote.likes++;
  await quote.save();
  res.status(200).json({
    status: 'success',
    data: quote,
  });
});
///
exports.removeLike = catchAsync(async (req, res, next) => {
  const quote = await Quotes.findById(req.body.id);
  if (!quote) {
    return next(new AppError('Quote not found!', 404));
  }
  quote.likes = Math.max(0, --quote.likes);
  await quote.save();
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.removeDislike = catchAsync(async (req, res, next) => {
  const quote = await Quotes.findById(req.body.id);
  if (!quote) {
    return next(new AppError('Quote not found!', 404));
  }
  quote.dislikes = Math.max(0, --quote.dislikes);
  await quote.save();
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.addDislike = catchAsync(async (req, res, next) => {
  const quote = await Quotes.findById(req.body.id);
  if (!quote) {
    return next(new AppError('Quote not found!', 404));
  }
  quote.dislikes++;
  await quote.save();
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const quote = await Quotes.findById(req.body.id);
  if (!quote) {
    return next(new AppError('Quote not found!', 404));
  }
  quote.comments.unshift(req.body.comment);
  await quote.save();
  res.status(201).json({
    status: 'success',
    data: quote,
  });
});

exports.getAllUserQuotes = catchAsync(async (req, res, next) => {
  const quotes = await Quotes.aggregate([
    {
      $match: {
        username: req.query.username,
      },
    },
  ]);
  if (!Array.isArray(quotes)) {
    return next(new AppError('Something went very wrong!', 500));
  }

  res.status(200).json({
    status: 'success',
    data: {
      quotes,
    },
  });
});
exports.deleteQuote = catchAsync(async (req, res, next) => {
  const quote = await Quotes.findByIdAndDelete(req.body.id).select('+active');
  if (!quote) {
    return next(new AppError('Quote not found!', 404));
  }
  if (quote.username !== req.body.username) {
    return next(new AppError('You can not delete this quote!', 404));
  }
  /* quote.active = false;
  await quote.save();
*/

  res.status(203).json({
    status: 'success',
    data: null,
  });
});
