exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles_test", articlesTest => {
    articlesTest.increments("article_id").primary();
    articlesTest.string("title").notNullable();
    articlesTest.string("body", 1000).notNullable();
    articlesTest.integer("votes").defaultTo(0);
    articlesTest
      .string("topic")
      .references("topic")
      .inTable("topics_test")
      .notNullable();
    articlesTest
      .string("author")
      .references("username")
      .inTable("users_test")
      .notNullable();
    articlesTest.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {};
