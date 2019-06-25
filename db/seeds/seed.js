const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../index.js");
const { formatDate, formatComments, makeRefObj } = require("../utils/utils");
//seeding database
exports.seed = function(knex, Promise) {
  return knex.migrate //migrating database
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData);
      const usersInsertions = knex("users").insert(userData);

      return Promise.all([topicsInsertions, usersInsertions])
        .then(() => {
          modifiedArticleData = formatDate(articleData);
          return knex("articles")
            .insert(modifiedArticleData)
            .returning("*");
        })
        .then(articleRows => {
          const articleRef = makeRefObj(articleRows);
          let formattedComments = formatDate(commentData);
          formattedComments = formatComments(formattedComments, articleRef);

          return knex("comments").insert(formattedComments);
        });
    });
};
