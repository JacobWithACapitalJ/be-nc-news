const connection = require("./index");

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
    .then(result => {
      return result[0];
    });
}
module.exports = updateComments;
