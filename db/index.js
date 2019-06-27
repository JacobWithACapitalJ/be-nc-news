const test = require("./test-data/index");
const development = require("./development-data/index");
const data = { test, development, production: development };
const seed = require("./seeds/seed");
process.env.NODE_ENV === "test"
  ? (testData = data.test)
  : (testData = data.development);

module.exports = testData;
