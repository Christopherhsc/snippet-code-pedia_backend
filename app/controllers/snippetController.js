const Snippet = require("../models/snippet");

// GET
exports.getAllSnippets = (req, res) => {
  Snippet.find()
    .then((snippets) => res.json(snippets))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getNineSnippets = (req, res) => {
  Snippet.aggregate([{ $sample: { size: 9 } }])
    .then((snippets) => res.json(snippets))
    .catch((err) => res.status(400).json("Error: " + err));
};

// POST
exports.createSnippet = (req, res) => {
  const {
    title,
    description,
    snippetTemplate,
    snippetStyle,
    tags,
    userId,
    username, // Include username
    email, // Include email
  } = req.body;

  const newSnippet = new Snippet({
    title,
    description,
    snippetTemplate,
    snippetStyle,
    tags,
    userId,
    username, 
    email, 
  });

  newSnippet
    .save()
    .then(() => res.json("Snippet added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};
