const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo: String,
  check: Boolean
});

module.exports = mongoose.model('Todo', todoSchema);