const { fetchUser, authUser } = require("../models/users");

function getUser(req, res, next) {
  const { username } = req.params;
  fetchUser(username)
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({ code: 404, msg: "not found" });
      } else {
        res.status(200).send(result);
      }
    })
    .catch(next);
}

function loginUser(req, res, next) {
  const { username, password } = req.body;

  authUser(username, password)
    .then(result => {
      if (result === true) {
        res.status(200).send({ login: result });
      } else {
        return Promise.reject({ code: 404, msg: "incorrect credentials" });
      }
    })
    .catch(next);
}

module.exports = { getUser, loginUser };
