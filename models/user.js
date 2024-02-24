const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  imageUrl: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
