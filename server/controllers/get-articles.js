const fetchArticles = require("../models/fetchArticles");
function getArticles(req, res, next) {
  const { article_id } = req.params;
  const { sort_by, order_by, author, topic } = req.query;
  fetchArticles(article_id, sort_by, order_by, author, topic)
    .then(results => {
      if (results.length === 0) {
        return Promise.reject({ code: 404, msg: "not found" });
      } else {
        res.status(200).send(results);
      }
    })
    .catch(next);
}
module.exports = getArticles;
