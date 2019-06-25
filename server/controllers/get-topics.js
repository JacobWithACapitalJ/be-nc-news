const fetchTopics = require("../models/fetchTopics");
module.exports = function getTopics(req, res, next) {
  fetchTopics().then(results => {
    res.status(200).send(results);
  });
};
