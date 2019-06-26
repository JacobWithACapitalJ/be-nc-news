const usersRouter = require("express").Router();
const getUser = require("../controllers/get-user");
usersRouter.get("/:username", getUser);

module.exports = usersRouter;
