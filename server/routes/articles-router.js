const { getArticles, patchArticles } = require("../controllers/articles");

const { getComments, postComments } = require("../controllers/comments");

const articlesRouter = require("express").Router();
const auth = require("../controllers/authenticate");
articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticles)
  .patch(patchArticles);
articlesRouter.route("/:article_id/comments").get(getComments);
articlesRouter.use("/:article_id/newComment", auth);
articlesRouter.post("/:article_id/newComment", postComments);
module.exports = articlesRouter;
