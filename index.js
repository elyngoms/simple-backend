require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("./models");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001; // Must be different than the port of the React app

app.use(cors()); // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
mongoose.connect(
  "mongodb+srv://mongouser:" +
    process.env.MONGODB_PWD +
    "@clustermain.fgm5bzz.mongodb.net?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json()); // Allows express to read a request body
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
