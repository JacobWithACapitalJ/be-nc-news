const connection = require("../../connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

function fetchUser(username) {
  return connection
    .select("*")
    .from("users")
    .where("username", "=", username)
    .returning("*")
    .then(result => {
      return result;
    });
}

function authUser(username, password) {
  let dbPassword = "";
  return fetchUser(username).then(user => {
    dbPassword = user[0].password;

    return bcrypt
      .compare(password, dbPassword)
      .then(same => {
        return same;
      })
      .catch(console.log);
  });
}

module.exports = { fetchUser, authUser };
