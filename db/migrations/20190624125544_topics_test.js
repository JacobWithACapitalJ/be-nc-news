exports.up = function(knex, Promise) {
  console.log("creating topics table...");
  return knex.schema.createTable("topics", topics => {
    topics.string("description", 1000).notNullable();
    topics.string("slug").primary();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing topics table...");
  return knex.schema.dropTable("topics");
};
