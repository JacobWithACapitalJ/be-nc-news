const removeComments = require("../models/removeComments");

function deleteComments(req, res, next) {
  const { comment_id } = req.params;
  removeComments(comment_id).then(result => {
    res.status(204).send("no content");
  });
}

module.exports = deleteComments;
