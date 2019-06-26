const getArticles = require("../controllers/get-articles");
const articlesRouter = require("express").Router();

articlesRouter.route("/").get(getArticles);
articlesRouter.get("/:article_id", getArticles);
module.exports = articlesRouter;
