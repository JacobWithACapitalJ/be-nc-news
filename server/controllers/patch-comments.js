const updateComments = require("../models/updateComments");

function patchComments(req, res, next) {
  const { comment_id } = req.params;
  const body = req.body;
  updateComments(comment_id, body)
    .then(result => {
      if (!result) {
        return Promise.reject({ code: 404, msg: "not found" });
      }
      res.status(201).send(result);
    })
    .catch(next);
}

module.exports = patchComments;
