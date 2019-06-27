const fetchComments = require("../models/fetchComments");

function getComments(req, res, next) {
  const { article_id } = req.params;
  const { sort_by, order_by } = req.query;
  fetchComments(article_id, sort_by, order_by)
    .then(results => {
      if (results.length === 0) {
        return Promise.reject({ code: 404, msg: "not found" });
      }
      res.status(200).send(results);
    })
    .catch(next);
}

module.exports = getComments;
