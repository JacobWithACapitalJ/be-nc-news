const {
  apiRouter,
  topicsRouter,
  articlesRouter,
  usersRouter,
  commentsRouter
} = require("./index");
const getEndpoints = require("../controllers/endpoints");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.get("/", getEndpoints);
module.exports = apiRouter;
