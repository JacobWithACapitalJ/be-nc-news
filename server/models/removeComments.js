const connection = require("./index");

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
module.exports = removeComments;
