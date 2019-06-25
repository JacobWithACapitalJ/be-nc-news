const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../index.js");
const { formatDate, formatComments, makeRefObj } = require("../utils/utils");
//modifiying timstamps of articles data
article_time = articleData.map(article => {
  return article.created_at;
});
timesList = formatDate(article_time);
let modifiedArticleData = articleData.map((article, index) => {
  article.created_at = timesList[index];
  return article;
});

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
          return knex("articles")
            .insert(modifiedArticleData)
            .returning("*");
        })
        .then(articleRows => {
          const articleRef = makeRefObj(articleRows);
          const formattedComments = formatComments(commentData, articleRef);

          comment_time = formattedComments.map(comment => {
            return comment.created_at;
          });
          timesList = formatDate(comment_time);
          let modifiedformattedComments = formattedComments.map(
            (comment, index) => {
              comment.created_at = timesList[index];
              return comment;
            }
          );

          return knex("comments").insert(modifiedformattedComments);
        });
    });
};
