const removeComments = require("../models/removeComments");

function deleteComments(req, res, next) {
  const { comment_id } = req.params;
  removeComments(comment_id)
    .then(result => {
      if (result !== 1) {
        return Promise.reject({ code: 404, msg: "not found" });
      } else {
        res.status(204).send("no content");
      }
    })
    .catch(next);
}

module.exports = deleteComments;
