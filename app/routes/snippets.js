const express = require("express");
const router = express.Router();
const snippetController = require("../controllers/snippetController");

// Routes
router.get("/", snippetController.getAllSnippets);
router.get("/random", snippetController.getNineSnippets);
router.post("/", snippetController.createSnippet);
router.get("/:userId", snippetController.getUserSnippets);

module.exports = router;
