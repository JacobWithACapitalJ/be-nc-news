const { fetchArticles, updateArticles } = require("../models/articles");

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

function patchArticles(req, res, next) {
  const { article_id } = req.params;

  const body = req.body;
  if (!body.inc_votes) {
    return next({ code: 400, msg: "bad request" });
  } else if (typeof body.inc_votes !== "number") {
    return next({ code: 400, msg: "bad request" });
  }
  updateArticles(article_id, body)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(next);
}

module.exports = { getArticles, patchArticles };
