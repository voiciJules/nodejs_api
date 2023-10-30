const express = require("express");
const morgan = require("morgan");
const app = express();

var users = [
  { id: 1, name: "alice" },
  { id: 2, name: "beck" },
  { id: 3, name: "chris" },
];

app.use(morgan("dev"));

app.get("/users", (req, res) => {
  res.json(users);
});

const port = 3000;
app.listen(port, function () {
  console.log("Server is running");
});

module.exports = app;
