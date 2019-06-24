exports.up = function(knex, Promise) {
  console.log("creating users_test table...");
  return knex.schema.createTable("users_test", usersTest => {
    usersTest.string("username").primary();
    usersTest.unique("username");

    usersTest.string("avatar_url", 256);
    usersTest.string("name");
  });
};

exports.down = function(knex, Promise) {
  console.log("removing users_tet table");
  return knex.schema.dropTable("users_test");
};
