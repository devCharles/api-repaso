const Post = require("../models/post.model");

function getAll() {
  return Post.find().populate("author");
}

function getById(id) {
  return Post.findById(id).populate("author");
}

function create(data) {
  return Post.create(data);
}

module.exports = {
  getAll,
  getById,
  create,
};
