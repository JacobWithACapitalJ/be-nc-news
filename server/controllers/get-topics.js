const { fetchTopics, fetchTopicSlug } = require("../models/fetchTopics");

function getTopics(req, res, next) {
  fetchTopics().then(results => {
    res.status(200).send(results);
  });
}
function GetTopicSlug(req, res, next) {
  const { slug } = req.params;
  console.log(slug);
  fetchTopicSlug(slug).then(results => {
    if (results.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    res.status(200).send(results);
  });
}
module.exports = { getTopics, GetTopicSlug };
