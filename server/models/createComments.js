const connection = require("./index");

function createComments(comment) {
  return connection
    .insert(comment)
    .into("comments")
    .returning("*")
    .then(result => {
      return result;
    });
}

module.exports = createComments;
