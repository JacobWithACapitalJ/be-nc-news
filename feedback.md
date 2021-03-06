## General

- [ ] why is everything in a server folder?
- [x] setting up the node env from various places
- [x] where is connection.js hiding
- [x] group like functionality in one file - like everything which deals with topics in one file, everything which deals with articles in another, etc, to tidy up all the folders

- [x] /server/controllers/get-topics:
      `function GetTopicSlug(req, res, next) {` - no caps unless a class!

- 405 error handling missing - use `.route()` for the path, then the specific allowed paths, then `.all()` to trigger a controller (which is error handling controller, so in errors folder) to handle 405 errors

* - [x] sending an array, rather than an object with a key 'topics'
* - [x] same for comments and articles - call things what they are, rather than a more generic 'results' so your code is more legible

* - [x] patch is code of 200 (successful) rather than 201 (Created), as you haven't created anything new.

### GET `/api/articles`

- [x] when you do the count of comments, call that key 'comment_count', instead of just 'comments', because you will need to fetch all comments for an article, which is a little confusing

### GET `/api/articles/1`

- [x] when you reuse the controller and models (which is nifty, granted), you lose control of what you can send back to the user, without doing an 'if' statement in the controller. This goes back to sending things as an object, rather than directly as an array as you have in the controller.

### PATCH `/api/articles/1`

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- [x] provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

### GET `/api/articles/2/comments`

- [x] return 200: OK when the article exists
- [x] serve an empty array when the article exists but has no comments
- [x] an article can reasonably have no comments, eg: just been created.

### POST `/api/articles/1/comments`

[x] error handle when the new comment does not include all the keys

- [x] use a 400: Bad Request status code when `POST` request does not include all the required keys
- [x] use `notNullable` in migrations for required columns

### POST `/api/articles/10000/comments`

Assertion: expected 400 to be one of [ 404, 422 ]

- [x] use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist
