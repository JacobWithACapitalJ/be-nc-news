const topicsRouter = require("express").Router();
const { getTopics, getTopicSlug } = require("../controllers/topics");

topicsRouter.get("/", getTopics);
topicsRouter.get("/:slug", getTopicSlug);
module.exports = topicsRouter;
