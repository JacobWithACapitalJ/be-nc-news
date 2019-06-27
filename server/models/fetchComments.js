const connection = require("./index");

function fetchComments(article_id, sort_by, order_by) {
  return connection
    .select("body", "votes", "created_at", "author", "comment_id")
    .from("comments")
    .where("article_id", "=", article_id)
    .modify(query => {
      if (sort_by) {
        return query.orderBy(sort_by, order_by ? order_by : "desc");
      } else {
        return query.orderBy("created_at", "desc");
      }
    })
    .returning("*")
    .then(results => {
      return results;
    });
}

module.exports = fetchComments;
