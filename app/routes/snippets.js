const express = require("express");
const router = express.Router();
const snippetController = require("../controllers/snippetController");

// Routes
router.get("/", snippetController.getAllSnippets);
router.get("/random", snippetController.getNineSnippets);
router.post("/", snippetController.createSnippet);

module.exports = router;
