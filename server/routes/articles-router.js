const { getArticles, patchArticles } = require("../controllers/articles");

const { getComments, postComments } = require("../controllers/comments");

const articlesRouter = require("express").Router();

articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticles)
  .patch(patchArticles);
articlesRouter
  .route("/:article_id/comments")
  .get(getComments)
  .post(postComments);
module.exports = articlesRouter;
