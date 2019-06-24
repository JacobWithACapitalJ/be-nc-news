exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments_test", commentsTest => {
    commentsTest.increments("comment_id").primary();
    commentsTest.integer("votes").defaultTo(0);
    commentsTest
      .integer("article_id")
      .references("article_id")
      .inTable("articles_test")
      .notNullable();
    commentsTest
      .string("author")
      .references("username")
      .inTable("users_test")
      .notNullable();
    commentsTest.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTest.string("body", 1000).notNullable();
  });
};

exports.down = function(knex, Promise) {};
