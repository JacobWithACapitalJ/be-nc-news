const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const handle400 = require("./errors/errors");
const pug = require("pug");

app.use(express.json());
app.use("/api", apiRouter);
app.use("/", (req, res) => {
  pug.render("index");
});
app.use(handle400);

module.exports = app;
