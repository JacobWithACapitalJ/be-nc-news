const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/index");

topicsRouter.route("/").get(getTopics);

module.exports = topicsRouter;
