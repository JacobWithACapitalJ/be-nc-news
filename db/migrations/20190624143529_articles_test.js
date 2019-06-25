exports.up = function(knex, Promise) {
  console.log("creating articles table...");
  return knex.schema.createTable("articles", articles => {
    articles.increments("article_id").primary();
    articles.string("title").notNullable();
    articles.string("body", 1000).notNullable();
    articles.integer("votes").defaultTo(0);
    articles
      .string("topic")
      .references("slug")
      .inTable("topics")
      .notNullable();
    articles
      .string("author")
      .references("username")
      .inTable("users")
      .notNullable();
    articles.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  console.log("removing articles table...");
  return knex.schema.dropTable("articles");
};
