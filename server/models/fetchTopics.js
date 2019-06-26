const connection = require("./index");

function fetchTopics() {
  return connection
    .select("*")
    .from("topics")
    .returning("*")
    .then(results => {
      return results;
    });
}
function fetchTopicSlug(slug) {
  return connection
    .select("*")
    .from("topics")
    .where("slug", "=", slug)
    .returning("*")
    .then(results => {
      return results;
    });
}
module.exports = { fetchTopics, fetchTopicSlug };
