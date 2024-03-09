const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  title: String,
  description: String,
  snippetTemplate: String,
  snippetStyle: String,
  tags: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
});

module.exports = mongoose.model("Snippet", snippetSchema);
