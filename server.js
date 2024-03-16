require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(cors());

// Increase the limit for JSON payloads
app.use(bodyParser.json({ limit: "10mb" }))

mongoose.connect(process.env.MONGODB_URI, {});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send();
});

const userRouter = require("./app/routes/users");
app.use("/users", userRouter);
const snippetRouter = require("./app/routes/snippets");
app.use("/snippets", snippetRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
