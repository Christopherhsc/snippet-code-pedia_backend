const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

const saltRounds = 10;

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
  const { email, username, imageUrl, password } = req.body;

  User.findOne({ email: email })
    .then((existingUser) => {
      // Function to save or update user
      const saveOrUpdateUser = (hashedPassword) => {
        if (existingUser) {
          // Update existing user's information
          existingUser.email = email;
          existingUser.username = username;
          existingUser.imageUrl = imageUrl;
          if (hashedPassword) existingUser.password = hashedPassword;

          existingUser
            .save()
            .then((updatedUser) => res.json(updatedUser))
            .catch((err) => res.status(400).json("Error: " + err));
        } else {
          // Create a new user
          const newUser = new User({
            email: email,
            username: username,
            ...(imageUrl && { imageUrl: imageUrl }),
            ...(hashedPassword && { password: hashedPassword }), // Add password only if it exists
          });

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json("Error: " + err));
        }
      };

      if (password) {
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json("Error hashing password: " + err);
          }
          saveOrUpdateUser(hashedPassword);
        });
      } else {
        saveOrUpdateUser(null);
      }
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

module.exports = router;
