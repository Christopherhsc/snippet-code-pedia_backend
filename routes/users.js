const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/new", (req, res) => {
  User.findOne({ _id: req.body._id })
    .then((existingUser) => {
      if (existingUser) {
        // Update existing user's information
        existingUser.email = req.body.email;
        existingUser.username = req.body.username;
        existingUser.imageUrl = req.body.imageUrl;
        // Save the updated user information
        existingUser
          .save()
          .then((updatedUser) => res.json(updatedUser))
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        // Create a new user
        const newUser = new User({
          email: req.body.email,
          username: req.body.username,
          imageUrl: req.body.imageUrl,
        });
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

router.get("/", (req, res) => {
  res.send("users List");
});


router.get("/new", (req, res) => {
  res.send("User new form");
});

module.exports = router;
