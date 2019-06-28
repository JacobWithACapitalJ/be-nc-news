const { fetchUser } = require("../models/users");

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

module.exports = { getUser };
