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
      //hash user data
      // bcrypt.hash(document.password, saltRounds,
      //   function (err, hashedPassword) {
      //     if (err) {
      //       next(err);
      //     }
      //     else {
      //       document.password = hashedPassword;
      //       next();

      let hashedData = [...userData];

      hashedData.forEach((user, index) => {
        bcrypt
          .hash(user.password, saltRounds)
          .then(hash => {
            hashedData[index].password = hash;
          })
          .catch(console.log);
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
