// const testData = require("./test-data/index");
// const devData = require("./development-data/index");
const seed = require("./seeds/seed");
process.env.NODE_ENV === "test"
  ? (testData = require("./test-data/index"))
  : (testData = require("./development-data/index"));
module.exports = testData;
