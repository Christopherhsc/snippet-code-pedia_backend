const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

const saltRounds = 10;

router.post("/new", (req, res) => {
  const { email, username, imageUrl, password, registrationMethod } = req.body;

  User.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser && registrationMethod === "SCP") {
        // If the user already exists and the registration method is SCP, return an error
        return res.status(400).json({ message: "Email is already in use" });
      }

      const saveOrUpdateUser = (hashedPassword) => {
        // If the user exists and the registration method is GOOGLE, update the user
        if (existingUser && registrationMethod === "GOOGLE") {
          existingUser.username = username;
          existingUser.imageUrl = imageUrl;
          if (hashedPassword) existingUser.password = hashedPassword;
          existingUser
            .save()
            .then((updatedUser) => res.json(updatedUser))
            .catch((err) => res.status(400).json("Error: " + err));
        } else {
          // If the user doesn't exist, create a new user
          const newUser = new User({
            email,
            username,
            imageUrl,
            registrationMethod,
            ...(hashedPassword && { password: hashedPassword }),
          });

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json("Error: " + err));
        }
      };

      // If a password is provided, hash it before saving/updating the user
      if (password) {
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
          if (err)
            return res.status(500).json("Error hashing password: " + err);
          saveOrUpdateUser(hashedPassword);
        });
      } else {
        saveOrUpdateUser(null);
      }
    })
    .catch((err) => {
      res.status(500).json("Error: " + err);
    });

    router.post("/login", (req, res) => {
      const { email, password } = req.body;
    
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
    
          // Verify the password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              return res.status(500).json({ message: "Error during authentication" });
            }
    
            if (!isMatch) {
              return res.status(401).json({ message: "Invalid credentials" });
            }
    
            // Password matches, proceed with login
            // Convert the Mongoose document to a plain JavaScript object
            const userObject = user.toObject();
    
            // Remove password property from the object before sending it in the response
            delete userObject.password;
    
            res.json(userObject);
          });
        })
        .catch((err) => res.status(500).json("Error: " + err));
    });
    
});

module.exports = router;
