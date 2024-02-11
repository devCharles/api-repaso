const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 100,
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
  },
  image: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
