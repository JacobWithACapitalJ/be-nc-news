exports.up = function(knex, Promise) {
  // console.log("creating users table...");
  return knex.schema.createTable("users", users => {
    users.string("username").primary();

    users.string("avatar_url", 256);
    users.string("name");
  });
};

exports.down = function(knex, Promise) {
  // console.log("removing users table...");
  return knex.schema.dropTable("users");
};
