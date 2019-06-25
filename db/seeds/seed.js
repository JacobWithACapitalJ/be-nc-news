const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../index.js");
const { formatDate, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex, Promise) {
  const topicsInsertions = knex("topics").insert(topicData);
  const usersInsertions = knex("users").insert(userData);

  return Promise.all([topicsInsertions, usersInsertions])
    .then(() => {
      article_time = articleData.map(article => {
        return article.created_at;
      });
      timesList = formatDate(article_time);
      modifiedArticleData = articleData.map((article, index) => {
        article.created_at = timesList[index];
      });
      return knex("articles")
        .insert(modifiedArticleData)
        .then(articles => {
          console.log(articles);
          return articles;
        });
    })
    .then(articleRows => {
      /* 

      Your comment data is currently in the incorrect format and will violate your SQL schema. 

      Keys need renaming, values need changing, and most annoyingly, your comments currently only refer to the title of the article they belong to, not the id. 
      
      You will need to write and test the provided makeRefObj and formatComments utility functions to be able insert your comment data.
      */
      console.log(articleRows);
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      return knex("comments").insert(formattedComments);
    });
};
