const connection = require("./index");
function fetchArticles(article_id) {
  return connection
    .count({ comments: "comments.article_id" })
    .select("articles.*")
    .from("articles")
    .groupBy("articles.article_id")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .modify(query => {
      if (article_id) {
        query.where("articles.article_id", "=", article_id);
      }
    })
    .returning("*")
    .then(results => {
      return results;
    });
}

module.exports = fetchArticles;
