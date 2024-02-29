const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/:email", (req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

router.post("/new", (req, res) => {
  User.findOne({ email: req.body.email })
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



module.exports = router;
