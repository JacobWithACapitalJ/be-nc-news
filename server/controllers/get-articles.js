const fetchArticles = require("../models/fetchArticles");
function getArticles(req, res, next) {
  const { article_id } = req.params;
  fetchArticles(article_id)
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
