const connection = require("./index");

function fetchTopics() {
  return connection
    .select("*")
    .from("topics")
    .returning("*")
    .then(results => {
      return results;
    })
    .catch(err => {
      next(err);
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
    })
    .catch(err => {
      next(err);
    });
}
module.exports = { fetchTopics, fetchTopicSlug };
