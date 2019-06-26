const getArticles = require("../controllers/get-articles");
const patchArticles = require("../controllers/patch-articles");
const articlesRouter = require("express").Router();

articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticles)
  .patch(patchArticles);
module.exports = articlesRouter;
