const jwt = require("jsonwebtoken");
const secret = "asecret";

function auth(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  if (!token) {
    res.status(401).send("unauthorised");
  } else {
    jwt
      .verify(token, secret)
      .then(decoded => {
        req.username = decoded.username;
        next();
      })
      .catch(console.log);
  }
}
module.exports = auth;
