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
  });
});
