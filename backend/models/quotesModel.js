const mongoose = require('./mongodb');

const quotesScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      select: false,
    },
    username: {
      type: String,
      default: 'Anonymous',
    },
    title: {
      type: String,
      required: [true, 'A quote must have a title!'],
    },
    text: {
      type: String,
      required: [true, 'A quote must have a text!'],
    },
    active: {
      type: Boolean,
      default: true,
    },
    comments: [String],
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

quotesScheme.pre('^find', function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Quotes = mongoose.model('Quotes', quotesScheme);
module.exports = Quotes;
