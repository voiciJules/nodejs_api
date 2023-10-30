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
  // req.query.limit is string like '2', you have to change it as number by using parseInt(str, 십진수)
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    // if limit is not number,
    return res.status(400).end();
  }
  res.json(users.slice(0, limit)); // slice(index, limit) : index부터 limit - 1 index까지 배열을 반환.
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    // if id is not number
    return res.status(400).end();
  }
  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
});

const port = 3000;
app.listen(port, function () {
  console.log("Server is running");
});

module.exports = app;
