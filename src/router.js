import express from "express";
import { getBooksHandler,getBookByIdHandler } from "./controllers/books.js";
import { getAllAuthorsHandler ,getAuthorByIdHandler,authorValidationRules,createAuthorHandler,
    updateAuthorHandler,authorUpdateValidationRules,deleteAuthorHandler
} from "./controllers/authors.js";

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *    summary: Get all books
 *    tags:
 *      - Books
 *    responses:
 *       200:
 *          description: Books returned successfully
 *       500:
 *          description: Internal server error
 */
router.get("/books", getBooksHandler);


/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get("/books/:id", getBookByIdHandler);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: Authors returned successfully
 *       500:
 *         description: Internal server error
 */
router.get("/authors", getAllAuthorsHandler);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author returned successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.get("/authors/:id", getAuthorByIdHandler);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorId:
 *                 type: string
 *               authorName:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *             required:
 *               - authorId
 *               - authorName
 *               - birthYear
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict - Author with this ID already exists
 *       500:
 *         description: Internal server error
 */
router.post("/authors", authorValidationRules, createAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorName:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.put("/authors/:id", authorUpdateValidationRules, updateAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.delete("/authors/:id", deleteAuthorHandler);

export default router;