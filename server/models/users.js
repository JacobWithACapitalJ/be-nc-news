const connection = require("../../connection");
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
module.exports = { fetchUser };