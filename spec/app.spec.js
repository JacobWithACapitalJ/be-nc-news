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
    });
  });
});
