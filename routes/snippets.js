const express = require("express");
const Snippet = require("../models/snippet");
const router = express.Router();

//GET SNIPPET
// GET route to fetch all snippets
router.get("/", (req, res) => {
  Snippet.find()
    .then((snippets) => res.json(snippets))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

//POST SNIPPET
router.post("/", (req, res) => {
  const { title, description, snippetTemplate, snippetStyle, tags, userId } =
    req.body;

  const newSnippet = new Snippet({
    title,
    description,
    snippetTemplate,
    snippetStyle,
    tags,
    userId,
  });

  newSnippet
    .save()
    .then(() => res.json("Snippet added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
