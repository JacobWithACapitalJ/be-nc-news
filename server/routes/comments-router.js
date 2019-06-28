const { patchComments, deleteComments } = require("../controllers/comments");
const commentsRouter = require("express").Router();

commentsRouter
  .route("/:comment_id")
  .patch(patchComments)
  .delete(deleteComments);

module.exports = commentsRouter;
