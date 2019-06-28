const {
  fetchComments,
  updateComments,
  createComments,
  removeComments
} = require("../models/comments");
const { fetchArticles } = require("../models/articles");
function getComments(req, res, next) {
  const { article_id } = req.params;
  const { sort_by, order_by } = req.query;
  fetchComments(article_id, sort_by, order_by)
    .then(comments => {
      if (comments.length === 0) {
        fetchArticles(article_id)
          .then(article => {
            if (article.length === 0) {
              return Promise.reject({ code: 404, msg: "not found" });
            } else {
              res.status(200).send([]);
            }
          })
          .catch(next);
      } else {
        res.status(200).send(comments);
      }
    })
    .catch(next);
}

function patchComments(req, res, next) {
  const { comment_id } = req.params;
  const body = req.body;
  updateComments(comment_id, body)
    .then(updatedComment => {
      if (!updatedComment) {
        return Promise.reject({ code: 404, msg: "not found" });
      }
      res.status(200).send(updatedComment);
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
    .then(createdComment => {
      res.status(201).send(createdComment);
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
