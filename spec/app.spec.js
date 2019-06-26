process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../server/app");
const request = require("supertest")(app);
const connection = require("../server/models/index");

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
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
              expect(result.body[0].slug).to.eql("mitch");
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
              "comments",
              "created_at"
            );
          });
      });
      describe("/:article_id", () => {
        it("returns status:200 and a single result", () => {
          return request
            .get("/api/articles/1")
            .expect(200)
            .then(results => {
              expect(results.body.length).to.equal(1);
            });
        });
        it("returns with a single article", () => {
          return request.get("/api/articles/1").then(results => {
            expect(results.body[0]).includes.keys(
              "title",
              "author",
              "body",
              "topic",
              "article_id",
              "comments",
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
        it("returns with 201", () => {
          return request
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(201);
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
      });
      describe.only("POST", () => {
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
      });
    });
  });
});
