const connection = require("./index");

function updateArticles(article_id, body) {
  return connection
    .select("*")
    .from("articles")
    .modify(query => {
      if (body.inc_votes) {
        return query.increment("votes", body.inc_votes);
      }
    })
    .where("articles.article_id", "=", article_id)
    .returning("*")
    .then(result => {
      return result;
    });
}
module.exports = updateArticles;
