# nc-news

##Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- postgress (pg)
- knex
- express
- heroku
- chai
- chai-sorted
- mocha
- supertest

### installing

This project uses npm to install the relevant packages.
All of the dependencies are provided in the 'package.json' file.

```bash
npm install
```

## Running the tests

Firstly we will need to setup the process enviroment to test, in order to use the test data. This can be done by using the following npm command:

```Bash

npm run set-env-test

```

The code for setting the enviroment can be found in `env-set.js`

The tests on the endpoints can be run using:

```Bash

npm test

```

As well as testing the utilities functions usedd for data-manipulation using:

```Bash
npm run test-utils
```

### Endpoint testing

The testing structurer follows a logical path of user interaction through the endpoints and their respective methods.

Each endpoint is tested for the correct status code, output and tested against invalid inputs (returing 404 and 400 errors when required).

For example, the `/api/articles` endpoint was tested both `GET` and `PATCH` requests using mocha & chai.

```npm test

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
      it("returns a value for the number of comments related to that article", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(results => {
            expect(results.body[0].comments).to.equal(13);
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


```

Tests were used to determine the correct keys of data were being recieved as opposed to the values of data which could have changed during testing of the database.

Further testing was conducted on parametric endpoints on the `/api/articles` endpoint as well as their corresponding `GET` and `POST` requests.

Queries were tested in much the same way, taking advanted of the `chai-sorted` package in order to test the queries ability to order the data in the response.

## Endpoints completed

- [x] GET /api/topics

- [x] GET /api/users/:username

- [x] GET /api/articles/:article_id
- [x] PATCH /api/articles/:article_id

- [x] POST /api/articles/:article_id/comments
- [x] GET /api/articles/:article_id/comments

- [x] GET /api/articles

- [x] PATCH /api/comments/:comment_id
- [x] DELETE /api/comments/:comment_id

- [x] GET /api

---
