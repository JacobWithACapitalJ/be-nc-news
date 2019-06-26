const connection = require("./index");

function fetchComments(article_id) {
  return connection
    .select({ username: "author" }, "body")
    .from("comments")
    .where("article_id", "=", article_id)
    .returning("*")
    .then(results => {
      return results;
    });
}

module.exports = fetchComments;
