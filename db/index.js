const testData = require("./test-data/index");
const devData = require("./development-data/index");

module.exports = process.env.NODE_ENV === "test" ? { testData } : { devData };
