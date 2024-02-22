const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect("mongodb://localhost:27017/yourDatabaseName", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
