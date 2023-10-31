const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const user = require("./api/user/index.js");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", user); // /user로 들어오는 모든 경로는 user가 담당을 한다는 뜻

module.exports = app;
