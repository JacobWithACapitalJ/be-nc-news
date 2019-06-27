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

## Endpoints completed

- [x] GET /api/topics

- [x] GET /api/users/:username

- [x] GET /api/articles/:article_id
- [x] PATCH /api/articles/:article_id

- [x] POST /api/articles/:article_id/comments -
- [x] GET /api/articles/:article_id/comments

- [x] GET /api/articles

- [x] PATCH /api/comments/:comment_id
- [x] DELETE /api/comments/:comment_id

- [x] GET /api

---

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
