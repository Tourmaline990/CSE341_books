# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2: Author CRUD Operations

TODO: Follow the example above to complete a spec for the authors feature.

### Goal
Add an author collection that stores author ids, names, and birth years. Your API should provide all CRUD operations for this collection.


### Data Model
Author documents will be stored in the `authors` collection.

Required Author fields: 
- `authorId` : string, required, custom id such as `a1`
- `authorName` : string, required
- `birthYear` : int, required

### Routes

#### GET /authors
purpose: Return all authors

Success: 
- status code: `200`
- Response body: an array of author objects

Errors:
- status code: `500` if an unexpected server error or database error occurs.
- Response body: an error message

#### GET /authors/:id
purpose: Returns author object by its custom id.

Success: 
- status code: `200` 
- response body: an author object

Errors: 
- `400` if id is not valid
- `404` if no author exists with that id
- `500` if an unexpected server error occurs

#### POST /authors
purpose: Create a new author

request body: 

    {
        "authorId": "a1",
        "authorName": "Ryan Holiday",
        "birthYear": 1974
    }

success: 
- status code: `201` 
- Response body: The newly created author object

Errors: 
- `400` if a required field is missing or not valid
- `409` if the authorId already exists
- `500` if an unexpected server error occurs

#### PUT /authors/:id

Request body: 
    {
        "authorName": "Updated author name",
        "birthYear" : 1999
    }

Success: 
- status code: `200`
- response body: the updated author object

Errors: 
`400` if a required field is missing or invalid
`404` if no author exists with that id
`500` if an unexpected server error occurs

#### DELETE /authors/:id
Purpose: Delete an existing author

Success: 
 - status code: `204`
 - Response body: none

Errors:
- `404` - no author exists with that id
- `400` - if a book references the author or id is invalid
- `500` - if an unexpected server error occurs

### Swagger Documentation
swagger must document every author route

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.
