const connection = require("./index");

module.exports = function fetchTopics() {
  return connection
    .select("*")
    .from("topics")
    .returning("*")
    .then(results => {
      return results;
    })
    .catch(err => {
      console.log(err);
    });
};
