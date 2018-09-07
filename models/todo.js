const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo: String
});

module.exports = mongoose.model('Todo', todoSchema);