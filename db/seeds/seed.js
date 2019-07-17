const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../index.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { formatDate, formatComments, makeRefObj } = require("../utils/utils");
//seeding database
exports.seed = function(knex, Promise) {
  return knex.migrate //migrating database
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      //hash passwords
      let hashedData = [...userData];
      let salt = bcrypt.genSaltSync(saltRounds);
      hashedData.forEach((user, index) => {
        if (user.password === undefined) {
          hashedData[index].password = "password";
        }

        hashedData[index].password = bcrypt.hashSync(user.password, salt);
      });

      const topicsInsertions = knex("topics").insert(topicData);
      const usersInsertions = knex("users").insert(hashedData);
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
