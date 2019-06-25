const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
// const { handlePSQL400Errors, handlePSQL500Errors } = require("./errors/errors");
app.use(express.json());
app.use("/api", apiRouter);
// app.all("/*", (req, res, next) => {
//   next({ status: 404, message: "not found" });
// });
// app.use(handlePSQL400Errors);

module.exports = app;
