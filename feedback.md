## General

- why is everything in a server folder?
- setting up the node env from various places
- where is connection.js hiding
- group like functionality in one file - like everything which deals with topics in one file, everything which deals with articles in another, etc, to tidy up all the folders

/server/controllers/get-topics:
`function GetTopicSlug(req, res, next) {` - no caps unless a class!

- 405 error handling missing - use `.route()` for the path, then the specific allowed paths, then `.all()` to trigger a controller (which is error handling controller, so in errors folder) to handle 405 errors

* sending an array, rather than an object with a key 'topics'
* same for comments and articles - call things what they are, rather than a more generic 'results' so your code is more legible

* patch is code of 200 (successful) rather than 201 (Created), as you haven't created anything new.

### GET `/api/articles`

- when you do the count of comments, call that key 'comment_count', instead of just 'comments', because you will need to fetch all comments for an article, which is a little confusing

### GET `/api/articles/1`

- when you reuse the controller and models (which is nifty, granted), you lose control of what you can send back to the user, without doing an 'if' statement in the controller. This goes back to sending things as an object, rather than directly as an array as you have in the controller.

### PATCH `/api/articles/1`

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

### GET `/api/articles/2/comments`

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments
- an article can reasonably have no comments, eg: just been created.

### POST `/api/articles/1/comments`

error handle when the new comment does not include all the keys

- use a 400: Bad Request status code when `POST` request does not include all the required keys
- use `notNullable` in migrations for required columns

### POST `/api/articles/10000/comments`

Assertion: expected 400 to be one of [ 404, 422 ]

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist
