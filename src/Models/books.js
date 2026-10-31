import { getDb } from "../db/connect.js";

const getAllBooks = async() => {
    const db  = getDb();
    const bookData = await db.collection("books").find({}).toArray();
    return bookData;
}

const getBookById = async(bookId) => {
  const db = getDb();
  const book = await db.collection("books").findOne({id:bookId});
  return book;
}
export {getAllBooks,getBookById}