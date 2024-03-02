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
  console.log("Kommer vi her?")
  const { email, username, imageUrl, password, registrationMethod } = req.body;

  console.log("Received request data:", req.body); // Log the incoming request data

  User.findOne({ email: email, registrationMethod: registrationMethod })
    .then((existingUser) => {
      console.log("Existing user found:", existingUser); // Log if an existing user is found

      const saveOrUpdateUser = (hashedPassword) => {
        if (existingUser) {
          console.log("Updating existing user:", existingUser); // Log the existing user's current data

          existingUser.username = username;
          existingUser.imageUrl = imageUrl;
          if (hashedPassword) existingUser.password = hashedPassword;

          existingUser
            .save()
            .then((updatedUser) => {
              console.log("Updated user:", updatedUser); // Log the updated user's data
              res.json(updatedUser);
            })
            .catch((err) => {
              console.error("Error updating user:", err); // Log any errors during user update
              res.status(400).json("Error: " + err);
            });
        } else {
          const newUser = new User({
            email,
            username,
            imageUrl,
            registrationMethod,
            ...(hashedPassword && { password: hashedPassword }),
          });

          console.log("Creating new user:", newUser); // Log the new user's data to be saved

          newUser
            .save()
            .then((user) => {
              console.log("Created new user:", user); // Log the newly created user's data
              res.json(user);
            })
            .catch((err) => {
              console.error("Error creating user:", err); // Log any errors during user creation
              res.status(400).json("Error: " + err);
            });
        }
      };

      if (password) {
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
          if (err) {
            console.error("Error hashing password:", err); // Log any errors during password hashing
            return res.status(500).json("Error hashing password: " + err);
          }
          saveOrUpdateUser(hashedPassword);
        });
      } else {
        saveOrUpdateUser(null);
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err); // Log any errors during user lookup
      res.status(500).json("Error: " + err);
    });
});

module.exports = router;
