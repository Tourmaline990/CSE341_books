import { json } from "express";
import { getAllBooks,getBookById,createBook,updateBook,deleteBook } from "../Models/books.js";
import { getAuthorById } from "../Models/authors.js";
import {validationResult, body} from "express-validator";


const bookValidationRules = [
  body("id").notEmpty().withMessage("Book ID is required"),
  body("title").notEmpty().withMessage("Book title is required"),
  body("authorId").notEmpty().withMessage("Author ID is required"),
  body("publicationDate").isString().withMessage("Publication date must be a string").notEmpty().withMessage("Publication date is required"),
];  

const bookUpdateValidationRules = [
  body("title").optional().notEmpty().withMessage("Book title cannot be empty"),
  body("authorId").optional().notEmpty().withMessage("Author ID cannot be empty"),
  body("publicationDate").optional().isString().withMessage("Publication date must be a string").notEmpty().withMessage("Publication date cannot be empty"),
];


const getBooksHandler = async(req,res) => {
    try {
       const allBooks = await getAllBooks();
        return res.status(200).json(allBooks)
    } catch (error) {
        console.log("All books retrieval failed:", error)
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

const getBookByIdHandler =  async(req,res)=> {
   try {
    const bookId = req.params.id;
    const book = await getBookById(bookId)
    if(!book){
        return res.status(404).json({"message" : "Book not found"})
    }
     return res.status(200).json(book)
   } catch (error) {
     console.log(" book retrieval failed:", error)
     return res.status(500).json({"message": "Internal Server Error"})
   }
}

const createBookHandler = async(req,res) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty()) return res.status(400).json(result.array());

        const authorId = req.body.authorId;
        const author = await getAuthorById(authorId);   
        if(!author) return res.status(400).json({"message": "Author not found "});
        
        const bookExists = await getBookById(req.body.id);
        if(bookExists) return res.status(409).json({"message": "Book with this ID already exists"});

        const bookData = req.body;
        const newBook = await createBook(bookData);
        return res.status(201).json(newBook);

    } catch (error) {
        console.log("Book creation failed:", error);
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

const updateBookHandler = async(req,res) => {
    try {
        const results = validationResult(req);
        if (!results.isEmpty()) return res.status(400).json(results.array());

        const bookId = req.params.id;
        if(!bookId) return res.status(400).json({"message": "Book ID is required"});
        
        if(req.body.authorId) {
            const authorId = req.body.authorId;
            const author = await getAuthorById(authorId);
            if(!author) return res.status(400).json({"message": "Author not found"});
        }

        const bookExists = await getBookById(bookId);
        if(!bookExists) return res.status(404).json({"message": "Book not found"});

        
        const updatedData = req.body;
        const updatedBook = await updateBook(bookId, updatedData);
        return res.status(200).json(updatedBook);

    } catch (error) {
        console.log("Book update failed:", error);
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

const deleteBookHandler = async(req,res) => {
    try {
        const bookId = req.params.id;
        if(!bookId) return res.status(400).json({"message": "Book ID is required"});

        const bookExists = await getBookById(bookId);
        if(!bookExists) return res.status(404).json({"message": "Book not found"});

        const result = await deleteBook(bookId);
        return res.sendStatus(204);

    } catch (error) {
        console.log("Book deletion failed:", error);
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

export {getBooksHandler,getBookByIdHandler,createBookHandler,updateBookHandler,deleteBookHandler, bookValidationRules, bookUpdateValidationRules};