const topicsRouter = require("express").Router();
const { getTopics, GetTopicSlug } = require("../controllers/index");

topicsRouter.get("/", getTopics);
topicsRouter.get("/:slug", GetTopicSlug);
module.exports = topicsRouter;
