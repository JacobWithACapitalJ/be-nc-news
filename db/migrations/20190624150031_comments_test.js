exports.up = function(knex, Promise) {
  console.log("creating comments table...");
  return knex.schema.createTable("comments", comments => {
    comments.increments("comment_id").primary();
    comments.integer("votes").defaultTo(0);
    comments
      .integer("article_id")
      .references("article_id")
      .inTable("articles")
      .notNullable();
    comments
      .string("author")
      .references("username")
      .inTable("users")
      .notNullable();
    comments.timestamp("created_at").defaultTo(knex.fn.now());
    comments.string("body", 1000).notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing comments table...");
  return knex.schema.dropTable("comments");
};
