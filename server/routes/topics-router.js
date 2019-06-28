const topicsRouter = require("express").Router();
const { getTopics, GetTopicSlug } = require("../controllers/topics");

topicsRouter.get("/", getTopics);
topicsRouter.get("/:slug", GetTopicSlug);
module.exports = topicsRouter;
