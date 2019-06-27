const patchComments = require("../controllers/patch-comments");
const deleteComments = require("../controllers/delete-comments");
const commentsRouter = require("express").Router();

commentsRouter
  .route("/:comment_id")
  .patch(patchComments)
  .delete(deleteComments);

module.exports = commentsRouter;
