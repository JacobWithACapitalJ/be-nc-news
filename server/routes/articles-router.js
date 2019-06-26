const getArticles = require("../controllers/get-articles");
const patchArticles = require("../controllers/patch-articles");
const articlesRouter = require("express").Router();
const getComments = require("../controllers/get-comments");
const postComments = require("../controllers/post-comments");
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
