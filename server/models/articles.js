const connection = require("../../connection");
function fetchArticles(
  article_id,
  sort_by = "created_at",
  order_by = "desc",
  author,
  topic
) {
  return connection
    .count({ comments_count: "comments.article_id" })
    .select("articles.*")
    .from("articles")
    .groupBy("articles.article_id")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .modify(query => {
      if (article_id) {
        query.where("articles.article_id", "=", article_id);
      }
    })
    .orderBy(sort_by, order_by)
    .returning("*")
    .modify(query => {
      if (author) {
        query.where("articles.author", "=", author);
      }
      if (topic) {
        query.where("articles.topic", "=", topic);
      }
    })
    .then(articles => {
      return articles.map(obj => {
        obj.comments_count = obj.comments_count * 1; //type coercion to int
        return obj;
      });
    });
}
function updateArticles(article_id, body = { inc_votes: 0 }) {
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
    .then(article => {
      return article;
    });
}

module.exports = { fetchArticles, updateArticles };
