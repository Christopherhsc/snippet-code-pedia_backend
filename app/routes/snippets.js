const express = require("express");
const router = express.Router();
const snippetController = require("../controllers/snippetController");

// Routes
router.get("/", snippetController.getAllSnippets);
router.get("/random", snippetController.getRandomSnippets);
router.get("/:userId", snippetController.getUserSnippets);

router.post("/", snippetController.createSnippet);

router.delete("/:snippetId", snippetController.deleteSnippet)

module.exports = router;
