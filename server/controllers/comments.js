const {
  fetchComments,
  updateComments,
  createComments,
  removeComments
} = require("../models/comments");

function getComments(req, res, next) {
  const { article_id } = req.params;
  const { sort_by, order_by } = req.query;
  fetchComments(article_id, sort_by, order_by)
    .then(results => {
      if (results.length === 0) {
        return Promise.reject({ code: 404, msg: "not found" });
      }
      res.status(200).send(results);
    })
    .catch(next);
}

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

module.exports = { getComments, deleteComments, patchComments, postComments };
