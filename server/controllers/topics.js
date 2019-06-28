const { fetchTopics, fetchTopicSlug } = require("../models/topics");

function getTopics(req, res, next) {
  fetchTopics()
    .then(topics => {
      if (topics.length === 0) {
        return Promise.reject({ code: 404, msg: "not found" });
      } else {
        res.status(200).send(topics);
      }
    })
    .catch(next);
}
function getTopicSlug(req, res, next) {
  const { slug } = req.params;

  fetchTopicSlug(slug)
    .then(topic => {
      if (topic.length === 0) {
        return Promise.reject({ code: 404, msg: "not found" });
      } else if (topic.length === 1) {
        res.status(200).send(topic[0]);
      }
    })
    .catch(next);
}
module.exports = { getTopics, getTopicSlug };
