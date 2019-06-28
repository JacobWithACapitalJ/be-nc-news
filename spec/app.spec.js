process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../server/app");
const request = require("supertest")(app);
const connection = require("../connection");
const chai = require("chai");
chai.use(require("chai-sorted"));

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("/", () => {
    it("provides an object with an overveiw of paths", () => {
      return request
        .get("/api")
        .expect(200)
        .then(results => {
          expect(results.body).includes.keys(
            "GET /api",
            "GET /api/topics",
            "GET /api/articles"
          );
        });
    });
  });
  describe("/users", () => {
    describe("/:username", () => {
      describe("GET", () => {
        it("returns a user of that username", () => {
          return request
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(results => {
              expect(results.body[0]).includes.keys(
                "username",
                "avatar_url",
                "name"
              );
            });
        });
        it("returns 404 error with invalid username", () => {
          return request
            .get("/api/users/invalidpath")
            .expect(404)
            .then(results => {
              expect(results.error.text).to.equal("not found");
            });
        });
      });
    });
  });
  describe("/topics", () => {
    describe("GET", () => {
      it("returns with 200", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(result => {
            return result.body;
          });
      });

      it("returns with the topics data", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(result => {
            expect(result.body[0]).to.have.keys("slug", "description");
          });
      });
      describe("/:topic", () => {
        it("returns with specific topic from slug", () => {
          return request
            .get("/api/topics/mitch")
            .expect(200)
            .then(result => {
              expect(result.body.slug).to.eql("mitch");
            });
        });
        it("returns a 404 error with an invalid slug", () => {
          return request
            .get("/api/topics/incorrect")
            .expect(404)
            .then(result => {
              expect(result.error.text).to.eql("not found");
            });
        });
      });
    });
  });
  describe("/articles", () => {
    describe("GET", () => {
      it("returns status:200 and all article data", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(results => {
            expect(results.body[0]).includes.keys(
              "title",
              "author",
              "body",
              "topic",
              "article_id",
              "comments_count",
              "created_at"
            );
          });
      });
      it("returns a value for the number of comments related to that article", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(results => {
            expect(results.body[0].comments_count).to.equal(13);
          });
      });
      describe("QUERIES", () => {
        describe("?sort_by=", () => {
          it("sorts articles by the specified collumn", () => {
            return request
              .get("/api/articles?sort_by=votes") //should now work for type coercion of comments
              .expect(200)
              .then(results => {
                expect(results.body).to.be.sortedBy("votes", {
                  descending: true
                });
              });
          });
          it("takes an order_by query to sort the data", () => {
            return request
              .get("/api/articles?sort_by=votes&order_by=asc")
              .expect(200)
              .then(results => {
                expect(results.body).to.be.sortedBy("votes", {
                  descending: false
                });
              });
          });
          it("returns 400 error when incorect sort_by", () => {
            return request
              .get("/api/articles?sort_by=invalid")
              .expect(400)
              .then(results => {
                expect(results.error.text).to.equal("bad request");
              });
          });
        });
        describe("?author=", () => {
          it("returns filtered data for specified author query", () => {
            return request
              .get("/api/articles?author=rogersop")
              .expect(200)
              .then(results => {
                results.body.forEach(obj => {
                  expect(obj.author).to.equal("rogersop");
                });
              });
          });
          it("returns 404 with incoreect username", () => {
            return request
              .get("/api/articles?author=invalidauthor")
              .expect(404)
              .then(results => {
                expect(results.error.text).to.equal("not found");
              });
          });
        });
        describe("?topic=", () => {
          it("filters by topic query", () => {
            return request
              .get("/api/articles?topic=mitch")
              .expect(200)
              .then(results => {
                results.body.forEach(obj => {
                  expect(obj.topic).to.equal("mitch");
                });
              });
          });
          it("returns 400 when invalid topic", () => {
            return request
              .get("/api/articles?topic=invalidtopic")
              .expect(404)
              .then(results => {
                expect(results.error.text).to.equal("not found");
              });
          });
        });
      });
      describe("/:article_id", () => {
        it("returns status:200", () => {
          return request.get("/api/articles/1").expect(200);
        });
        it("returns with a single article", () => {
          return request.get("/api/articles/1").then(results => {
            expect(results.body).includes.keys(
              "title",
              "author",
              "body",
              "topic",
              "article_id",
              "comments_count",
              "created_at"
            );
          });
        });
        it("returns an error with an incorrect ID", () => {
          return request
            .get("/api/articles/9999")
            .expect(404)
            .then(result => {
              expect(result.error.text).to.eql("not found");
            });
        });
      });
    });
    describe("PATCH", () => {
      describe("/:article_id", () => {
        it("returns with 200", () => {
          return request
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(200);
        });
        it("Returns with updated increment of votes for article of that ID", () => {
          return request
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .then(result => {
              expect(result.body[0].votes).to.equal(101);
            });
        });
        it("Returns with updated decrement of votes for article of that ID", () => {
          return request
            .patch("/api/articles/1")
            .send({ inc_votes: -1 })
            .then(result => {
              expect(result.body[0].votes).to.equal(99);
            });
        });
        it("responds with a 400 error when incorrect body supplied", () => {
          return request
            .patch("/api/articles/1")
            .send({ something_else: "hello" })
            .expect(400)
            .then(result => {
              expect(result.error.text).to.equal("bad request");
            });
        });
        it("responds with 400 error when body value is not an integer", () => {
          return request
            .patch("/api/articles/1")
            .send({ inc_votes: "hello" })
            .expect(400)
            .then(result => {
              expect(result.error.text).to.equal("bad request");
            });
        });
      });
    });
    describe("/:article_id/comments", () => {
      describe("GET", () => {
        it("returns all comments for an article", () => {
          return request
            .get("/api/articles/1/comments")
            .expect(200)
            .then(results => {
              expect(results.body[0]).to.have.keys(
                "body",
                "votes",
                "created_at",
                "author",
                "comment_id"
              );
            });
        });
        it("returns 404 when article_id is incorect", () => {
          return request.get("/api/articles/99/comments").expect(404);
        });
        it("returns with empty array when valid ID but no comments", () => {
          return request
            .get("/api/articles/2/comments")
            .expect(200)
            .then(results => {
              expect(results.body).to.eql([]);
            });
        });
      });
      describe("POST", () => {
        it("creates a new comment with keys username and body", () => {
          return request
            .post("/api/articles/1/comments")
            .send({ username: "butter_bridge", body: "this is just a test" })
            .expect(201)
            .then(result => {
              expect(result.body[0]).includes.keys("comment_id");
            });
        });
        it("returns 400 when username is not in users table", () => {
          return request
            .post("/api/articles/1/comments")
            .send({ username: "test", body: "this is just a test" })
            .expect(400);
        });
        it("returns 400 when keys of comment sent are not correct", () => {
          return request
            .post("/api/articles/1/comments")
            .send({
              incorrect: "errors",
              body: "this shouldn't work",
              username: "butter_bridge"
            })
            .expect(400);
        });
        it("returns 404 when article_id not found", () => {
          return request
            .post("/api/articles/99/comments")
            .send({ username: "butter_bridge", body: "this is just a test" })
            .expect(404);
        });
      });
      describe("QUERYS", () => {
        describe("?sort_by=", () => {
          it("sorts comments by date by default", () => {
            return request
              .get("/api/articles/1/comments")
              .expect(200)
              .then(results => {
                expect(results.body).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });
          it("sorts descending by column name from query", () => {
            return request
              .get("/api/articles/1/comments?sort_by=votes")
              .expect(200)
              .then(results => {
                expect(results.body).to.be.sortedBy("votes", {
                  descending: true
                });
              });
          });
          it("returns status:400 for an incorrect query", () => {
            return request
              .get("/api/articles/1/comments?sort_by=invalid")
              .expect(400)
              .then(results => {
                expect(results.error.text).to.equal("bad request");
              });
          });
        });
        describe("?order_by=asc", () => {
          it("returns sorted by query", () => {
            return request
              .get("/api/articles/1/comments?sort_by=votes&order_by=asc")
              .expect(200)
              .then(results => {
                expect(results.body).to.be.sortedBy("votes", {
                  descending: false
                });
              });
          });
        });
      });
    });
  });
  describe("/comments", () => {
    describe("/:comment_id", () => {
      describe("PATCH", () => {
        it("updates the votes on a comment", () => {
          return request
            .patch("/api/comments/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then(result => {
              expect(result.body).includes.keys("comment_id", "votes");
            });
        });
        it("returns 404 when id is not found", () => {
          return request
            .patch("/api/comments/999")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(result => {
              expect(result.error.text).to.equal("not found");
            });
        });
        it("returns 400 error when id is given as text", () => {
          return request
            .patch("/api/comments/invalid")
            .send({ inc_votes: 1 })
            .expect(400)
            .then(result => {
              expect(result.error.text).to.equal("bad request");
            });
        });
      });
      describe("DELETE", () => {
        it("deletes the comment by given id", () => {
          return request
            .delete("/api/comments/1")
            .expect(204)
            .then(result => {
              expect(result.body).to.eql({});
            });
        });
        it("returns 404 when incrorect ID gievn", () => {
          return request
            .delete("/api/comments/99")
            .expect(404)
            .then(result => {
              expect(result.error.text).to.eql("not found");
            });
        });
        it("returns 400 when text given as ID", () => {
          return request
            .delete("/api/comments/thiserror")
            .expect(400)
            .then(result => {
              expect(result.error.text).to.eql("bad request");
            });
        });
      });
    });
  });
});
