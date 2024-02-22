const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  imageUrl: String,
});

const User = mongoose.model("User", userSchema);
