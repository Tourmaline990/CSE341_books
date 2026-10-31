import { getAllBooks } from "../Models/books.js";

const getBooksHandler = async(req,res) => {
    try {
       const allBooks = await getAllBooks();
       res.status(200).json({"message": allBooks})
    } catch (error) {
        console.log("All books retrieval failed:", error)
        res.status(500).json({"message": "Internal Server Error"});
    }
    
}

export {getBooksHandler}