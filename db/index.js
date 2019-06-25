// const testData = require("./test-data/index");
// const devData = require("./development-data/index");
process.env.NODE_ENV = "test";
process.env.NODE_ENV === "test"
  ? (testData = require("./test-data/index"))
  : (testData = require("./development-data/index"));
module.exports = testData;
