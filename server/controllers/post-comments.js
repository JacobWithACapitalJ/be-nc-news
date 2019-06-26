const createComments = require("../models/createComments");

function postComments(req, res, next) {
  const { article_id } = req.params;
  const comment = req.body;
  comment.author = comment.username;
  delete comment.username;
  comment.article_id = article_id;

  createComments(comment)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(next);
}

module.exports = postComments;
