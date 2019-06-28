const connection = require("../../connection");

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
    .then(comments => {
      return comments;
    });
}

function createComments(comment) {
  return connection
    .insert(comment)
    .into("comments")
    .returning("*")
    .then(createdComment => {
      return createdComment;
    });
}

function updateComments(comment_id, body) {
  return connection
    .select("*")
    .from("comments")
    .modify(query => {
      if (body.inc_votes) {
        return query.increment("votes", body.inc_votes);
      }
    })
    .where("comments.comment_id", "=", comment_id)
    .returning("*")
    .then(updatedComment => {
      return updatedComment[0];
    });
}

function removeComments(comment_id) {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", "=", comment_id)
    .del()
    .then(result => {
      return result;
    });
}
module.exports = {
  fetchComments,
  createComments,
  updateComments,
  removeComments
};
