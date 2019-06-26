const fetchComments = require("../models/fetchComments");

function getComments(req, res, next) {
  const { article_id } = req.params;
  fetchComments(article_id).then(results => {
    res.status(200).send(results);
  });
}

module.exports = getComments;
