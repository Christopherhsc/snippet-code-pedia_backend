const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  title: String,
  description: String,
  snippetTemplate: String,
  snippetStyle: String,
  tags: String,
  username: String,
  email: String,
});

module.exports = mongoose.model("Snippet", snippetSchema);
