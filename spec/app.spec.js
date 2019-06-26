process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../server/app");
const request = require("supertest")(app);
const knex = require("knex");
const dbconfig = require("../knexfile");
const connection = knex(dbconfig);
const { seed } = require("../db/seeds/seed");

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("/topics", () => {
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
            expect(result.error.text).to.eql(`{"msg":"not found"}`);
          });
      });
    });
  });
  describe("/articles", () => {
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
    describe.only("/:article_id", () => {
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
            expect(result.error.text).to.eql(`{"msg":"not found"}`);
          });
      });
    });
  });
});
