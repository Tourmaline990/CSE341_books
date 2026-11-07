import { getAllAuthors, getAuthorById,createAuthor,updateAuthor,deleteAuthor} from "../Models/authors.js";
import {validationResult, body} from "express-validator"; 
import {  getBooksByAuthorId } from "../Models/books.js";


const authorValidationRules = [
  body("authorId").notEmpty().withMessage("Author ID is required"),
  body("authorName").notEmpty().withMessage("Author name is required"),
  body("birthYear").isInt({ min: 0 }).withMessage("Birth year must be a positive integer"),
];

const authorUpdateValidationRules = [
  body("authorName").optional().notEmpty().withMessage("Author name cannot be empty"),
  body("birthYear").optional().isInt({ min: 0 }).withMessage("Birth year must be a positive integer"),
];

const getAllAuthorsHandler = async (req, res) => {
  try {
    const authors = await getAllAuthors();
    return res.status(200).json(authors);
  } catch (error) {
    console.log("All authors retrieval failed:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  };
}

const getAuthorByIdHandler = async (req, res) => {
  try {
    const authorId = req.params.id;
    if(!authorId) {
       return res.status(400).json({ message: "Author ID is required" });   
    }
    const author = await getAuthorById(authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    return res.status(200).json(author);
  } catch (error) {
    console.log("Author retrieval failed:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createAuthorHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const authorData = req.body;
    const authorExists = await getAuthorById(authorData.authorId);
    if(authorExists) {
      return res.status(409).json({ message: "Author with this ID already exists" });
    }
    const newAuthor = await createAuthor(authorData);
    return res.status(201).json(newAuthor);
  } catch (error) {
    console.log("Author creation failed:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAuthorHandler = async (req, res) => {
  try {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(400).json({ errors: results.array() });
    }

    const authorId = req.params.id;
    if (!authorId) return res.status(400).json({ message: "Author ID is required" });

    const authorExists = await getAuthorById(authorId);
    if (!authorExists) return res.status(404).json({ message: "Author not found" });

    const updatedData = req.body;
    const updatedAuthor = await updateAuthor(authorId, updatedData);
    return res.status(200).json(updatedAuthor);
  } catch (error) {
    console.log("Author update failed:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

};

const deleteAuthorHandler = async (req, res) => { 
  try {
    const authorId = req.params.id;
    if (!authorId) return res.status(400).json({ message: "Author ID is required" });

    const authorExists = await getAuthorById(authorId);
    if (!authorExists) return res.status(404).json({ message: "Author not found" });
    
    const authorBooks = await getBooksByAuthorId(authorId);
    if (authorBooks && authorBooks.length > 0) {
      return res.status(400).json({ message: "Cannot delete author with associated books" });
    }
    const deletedAuthor = await deleteAuthor(authorId);
    return res.sendStatus(204);
  } catch (error) {
     console.log("Author deletion failed:", error);
     return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { getAllAuthorsHandler, getAuthorByIdHandler,createAuthorHandler,authorValidationRules , 
  authorUpdateValidationRules,updateAuthorHandler,deleteAuthorHandler};