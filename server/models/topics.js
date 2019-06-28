const connection = require("../../connection");

function fetchTopics() {
  return connection
    .select("*")
    .from("topics")
    .returning("*")
    .then(topics => {
      return topics;
    });
}
function fetchTopicSlug(slug) {
  return connection
    .select("*")
    .from("topics")
    .where("slug", "=", slug)
    .returning("*")
    .then(topic => {
      return topic;
    });
}
module.exports = { fetchTopics, fetchTopicSlug };
