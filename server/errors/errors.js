function handle400(err, req, res, next) {
  res.status(err.code).send(err.msg);
}

module.exports = handle400;
