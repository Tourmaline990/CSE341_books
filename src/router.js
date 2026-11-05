import express from "express";
import { getBooksHandler,getBookByIdHandler } from "./controllers/books.js";

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


export default router;