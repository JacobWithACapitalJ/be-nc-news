const {
  apiRouter,
  topicsRouter,
  articlesRouter,
  usersRouter,
  commentsRouter
} = require("./index");
const { loginUser } = require("../controllers/users");
const getEndpoints = require("../controllers/endpoints");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.get("/", getEndpoints);
apiRouter.get("/login", loginUser);
apiRouter.use("/*", (req, res, next) => {
  next({ code: 405, msg: "method not allowed" });
});
module.exports = apiRouter;
