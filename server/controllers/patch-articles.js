const updateArticles = require("../models/updateArticles");
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

module.exports = patchArticles;
