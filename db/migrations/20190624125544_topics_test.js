exports.up = function(knex, Promise) {
  console.log("creating topics_test table...");
  return knex.schema.createTable("topics_test", topicsTest => {
    topicsTest.string("topic").primary();
    topicsTest.string("description", 1000).notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing topics_test table...");
  return knex.schema.dropTable("topics_test");
};
