function handle400(err, req, res, next) {
  const PSQLerrors = ["23503", "42703"];
  if (PSQLerrors.includes(err.code)) {
    res.status(400).send("bad request");
  } else {
    res.status(err.code).send(err.msg);
  }
}

module.exports = handle400;
