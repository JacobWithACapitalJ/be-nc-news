const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const handle400 = require("./errors/errors");
const pug = require("pug");
app.set("view engine", "pug");
app.use(express.json());
app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.render("index");
});
app.use(handle400);

module.exports = app;
