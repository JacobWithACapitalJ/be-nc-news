const { fetchTopics, fetchTopicSlug } = require("../models/fetchTopics");

function getTopics(req, res, next) {
  fetchTopics().then(results => {
    res.status(200).send(results);
  });
}
function GetTopicSlug(req, res, next) {
  const { slug } = req.params;

  fetchTopicSlug(slug)
    .then(results => {
      if (results.length === 0) {
        return Promise.reject({ msg: "not found" });
      } else {
        res.status(200).send(results);
      }
    })
    .catch(next);
}
module.exports = { getTopics, GetTopicSlug };
