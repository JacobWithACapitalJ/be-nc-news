const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const handle400 = require("./errors/errors");

app.use(express.json());
app.use("/api", apiRouter);

app.use(handle400);

module.exports = app;
