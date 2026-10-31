import { json } from "express";
import { getAllBooks,getBookById } from "../Models/books.js";

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

export {getBooksHandler,getBookByIdHandler}